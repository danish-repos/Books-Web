import React, { useState, useEffect, useRef } from "react";
import styling from "@/styles/General.module.css";
import stylingBook from "@/components/Book/Book.module.css";
import Book from "@/components/Book/book";
import { useRouter } from "next/router";
import { getAllBooks, getAllAuthors, getAllGenres } from "@/helpers/api-util";

const Books = (props) => {
  const searchedItem = useRef()

  const router = useRouter();
  const { genre } = router.query;

  const [selectedGenre, setSelectedGenre] = useState(genre || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(props.books);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (genre) {
      setSelectedGenre(genre);
      setSearchTerm("");
    }

    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);

  }, [genre]);

  // when the user changes the genre, it shows all the books of that genre 
  const handleGenreChange = () => {
    const newFilteredBooks = props.books.filter((book) => {

      const genreMatch = selectedGenre ? book.genreId === selectedGenre : true;
      return genreMatch;

    });
    setFilteredBooks(newFilteredBooks);
    setSearchTerm("");
  };

  // when the user presses the search button, it should filter the data and add the search into recent searches
  const searchBook = () => {

    const newFilteredBooks = filteredBooks.filter((book) => {

      const searchMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      return searchMatch;

    });
    setFilteredBooks(newFilteredBooks);

    if(searchTerm){
      const updatedSearches = [...recentSearches, searchTerm].slice(-5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }   

  }

  const bookClick = (id) => {
    router.push("/books/" + id);
  };

  useEffect(() => {
    handleGenreChange()
  },[selectedGenre])


  return (
    <>
      <header className={styling.heading}>All Books Page</header>

      <div className={styling.filterContainer}>

        <select className={styling.dropdown} value={selectedGenre} 
        onChange={(e) => setSelectedGenre(e.target.value)} >
          
          <option value="">All Genres</option>
          {props.genres.map((genre) => 
            (<option key={genre.id} value={genre.id}>{genre.name}</option>)
          )}

        </select>

        <input
          type="text" className={styling.searchBar} placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className={styling.searchButton} onClick={searchBook}>Search</button>
      </div>

      <div className={styling.recentSearchesContainer}>

        <div className={styling.recentSearches}>
          <h3>Recent Searches</h3>

          <ul>
            {recentSearches.map((term) => (<li key={term}>{term}</li>))}
          </ul>

        </div>

      </div>

      <div className={stylingBook.bookList}>

        {filteredBooks.map((book) => (
          <Book key={book.id} details={book} authors={props.authors} genres={props.genres}
          onClickBook={() => bookClick(book.id)}/>

        ))}

      </div>

    </>
  );
}

export async function getStaticProps() {
  const dataBooks = await getAllBooks();
  const dataAuthors = await getAllAuthors();
  const dataGenres = await getAllGenres();

  if (!dataBooks || !dataAuthors || !dataGenres) {
    return {
      redirect: {
        destination: "/error",
      },
    };
  }

  return {
    props: {
      books: dataBooks,
      authors: dataAuthors,
      genres: dataGenres,
    },
  };
}

export default Books
