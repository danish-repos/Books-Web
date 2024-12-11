import stylingBook from "../components/Book/Book.module.css";
import styling from "../styles/General.module.css";
import Book from "@/components/Book/book";
import { useRouter } from "next/router";
import { getAllAuthors, getAllGenres, getFeaturedBooks } from "@/helpers/api-util";
import { getSession } from "next-auth/react";


export default function Home(props) {
  const router = useRouter();

  const bookClicked = (id) => {
    router.push("/books/" + id);
  };

  const viewAllBooks = () => {
    router.push("/books");
  };

  return (
    <>
      <header className={styling.heading}>Featured Books</header>

      <div className={stylingBook.bookList}>
        {props.books.map((book) => (
          <Book details={book} authors={props.authors} genres={props.genres}
            onClickBook={() => bookClicked(book.id)}
          />
        ))}
      </div>

      <div className={styling.Buttons}>
        <button className={styling.Button} onClick={viewAllBooks}>View All Books</button>
      </div>

    </>
  );
}

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const dataBooks = await getFeaturedBooks();
  const dataAuthors = await getAllAuthors();
  const dataGenres = await getAllGenres();

  if (!dataBooks || !dataAuthors || !dataGenres) {
    return {
      notFound: true 
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
