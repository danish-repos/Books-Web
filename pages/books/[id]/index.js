import React from 'react'
import Book from '@/components/Book/book';
import styles from '@/styles/General.module.css';
import stylingBook from '@/components/Book/Book.module.css'
import { getBookById, getAllAuthors, getAllGenres, getAllBooks } from '@/helpers/api-util';
import { useRouter } from 'next/router';



const BookDetails = (props) => {
  const router = useRouter()

  
  const authorClicked = (id) => {
    router.push(`/books/${id}/author`)
  }
  
  return (
    <>
    <header className={styles.heading}>Book Details</header>

    <div className={stylingBook.bookList}>
      <Book details={props.books} authors={props.authors} genres={props.genres}/>
    </div>

    <div className={styles.Buttons}>
      <button className={styles.Button} onClick={() => authorClicked(props.books.id)}> About Author</button>

    </div>
    </>
  )
}


export async function getStaticProps(context){

  const dataBooks = await getBookById(context.params.id)

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
    },
    revalidate : 30
  }
}



export async function getStaticPaths(){

  const books = await getAllBooks()

  const idBooks = books.map (val => val.id)
  const pathsBooks = idBooks.map(i => ({params : {id: i}}))

  return {
    paths: pathsBooks,
    fallback : false
  }

}



export default BookDetails;
