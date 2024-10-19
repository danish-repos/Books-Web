import stylingBook from '../components/Book/Book.module.css';
import styling from '../styles/General.module.css';
import Book from "@/components/Book/book";
import { useRouter } from "next/router";
import {getAllBooks, getAllAuthors, getAllGenres} from "@/helpers/api-util"


export default function Home(props) {

  const router = useRouter(); 

  const viewGenres = () => {
    router.push('/genres');  
  };

  const bookClicked = (id) => {
    router.push('/books/'+ id)
  }

  const viewAllBooks = () => {
    router.push('/books');  
  };

  const viewAllAuthors = () => {
    router.push('/authors');  
  };


  return (
    <>
    <header className={styling.heading}>Featured Books</header>


    <div className={stylingBook.bookList}>

      {props.books.map(book => (<Book details={book} authors= {props.authors} 
      genres = {props.genres} onClickBook = {()=> bookClicked(book.id)}/> ))}

    </div>

    <div className={styling.Buttons}>
    <button className={styling.Button} onClick={viewGenres}>View Genres</button>
    <button className={styling.Button} onClick={viewAllBooks}>View All Books</button>
    <button className={styling.Button} onClick={viewAllAuthors}>View All Authors</button>
    </div>

    </>
  );
}


export async function getStaticProps(){

  const dataBooks = await getAllBooks()
  const dataAuthors = await getAllAuthors()
  const dataGenres = await getAllGenres()

  if(!dataBooks ||!dataAuthors ||!dataGenres){
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

