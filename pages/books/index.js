import React, { useState,useEffect } from 'react'
import styling from '@/styles/General.module.css'
import stylingBook from '@/components/Book/Book.module.css'
import Book from '@/components/Book/book';
import { useRouter } from 'next/router';
import {getAllBooks, getAllAuthors, getAllGenres} from "@/helpers/api-util"
  
const Books = (props) => {

  const router = useRouter()
  const {genre} = router.query
  
  const [selectedGenre, setSelectedGenre] = useState(genre || ''); 
  const [searchTerm, setSearchTerm] = useState(''); 

  
  const filteredBooks = props.books.filter((book) => {

    const genreMatch = selectedGenre ? book.genreId === selectedGenre : true;
    const searchMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return genreMatch && searchMatch;
  })

  useEffect(() => {
    if (genre) {
      setSelectedGenre(genre);
    }
  }, [genre]);

  const bookClick = (id) => {
    router.push('/books/'+ id)
  }
  
  return (
    <div>

    <header className={styling.heading}>All Books Page</header>

    <div className={styling.filterContainer}>
      <select className={styling.dropdown} value= {selectedGenre} onChange={(e)=> setSelectedGenre(e.target.value)}>

        <option value="">All Genres</option>
        {props.genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}

      </select>

      <input type="text" className={styling.searchBar} placeholder="Search by title..."
      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

    </div>



    <div className={stylingBook.bookList}>

    {filteredBooks.map(book => (<Book details={book} authors= {props.authors} 
    genres = {props.genres} onClickBook ={()=>bookClick(book.id)} />  ))}

    </div>

    </div>
  )
}


export async function getStaticProps(){

  const dataBooks = await getAllBooks()
  const dataAuthors = await getAllAuthors()
  const dataGenres = await getAllGenres()

  if(!dataBooks || !dataAuthors || !dataGenres){
    return{
      redirect:{
        destination: '/error'
      }
    }
  }


  return {
    props:{
      books:dataBooks,
      authors:dataAuthors,
      genres:dataGenres
    }
  }
}

export default Books;


