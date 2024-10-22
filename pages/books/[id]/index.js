import React from 'react'
import Book from '@/components/Book/book';
import styles from '@/styles/General.module.css';
import stylingBook from '@/components/Book/Book.module.css'
import { getBookById, getAllAuthors, getAllGenres, getAllBooks, getAllUsers, getReviewByBookId } from '@/helpers/api-util';
import { useRouter } from 'next/router';

const BookDetails = (props) => {
  const router = useRouter()
  
  const authorClicked = (id) => {
    router.push(`/books/${id}/author`)

  }

  const getUsernameById = (userId) => {
    const user = props.users.find((user) => user.id === userId);
    return user ? user.username : 'Unknown User';
  }
  
  return (
    <>
      <header className={styles.heading}>Book Details</header>

      <div className={stylingBook.bookList}>
        <Book details={props.books} authors={props.authors} genres={props.genres}/>
      </div>

      <div className={styles.Buttons}>
        <button className={styles.Button} onClick={() => authorClicked(props.books.id)}>About Author</button>
      </div>

      <section className={stylingBook.reviewSection}>
        {props.review.length!==0 && <h2 className={stylingBook.reviewHeading}>Reviews</h2>}

        <ul className={stylingBook.reviewList}>

          {props.review.map((review) => (

            <li key={review.id} className={stylingBook.reviewItem}>
              <p className={stylingBook.reviewUser}>{getUsernameById(review.userId)}:</p>
              <p className={stylingBook.reviewRating}>Rating: <span>{review.rating}</span></p>
              <p className={stylingBook.reviewComment}>"{review.comment}"</p>
            </li>

          ))}
        </ul>

      </section>
    </>
  );
}


export async function getStaticProps(context){

  const dataBooks = await getBookById(context.params.id)

  const dataAuthors = await getAllAuthors()
  const dataGenres = await getAllGenres()

  const dataUsers = await getAllUsers();
  const dataReview = await getReviewByBookId(context.params.id);

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
      genres:dataGenres,
      users:dataUsers,
      review:dataReview
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
