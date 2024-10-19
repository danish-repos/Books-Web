
import React  from 'react'
import styles from '@/styles/General.module.css';
import Author from '@/components/Authors/author';
import { getAuthorById, getBookById } from '@/helpers/api-util';



const SpecificBooksAuthor = (props) => {

  return (
    <div>

    <header className={styles.heading}>Author Information</header>
    <Author author = {props.Author}/>

    </div>
  )

}

export async function getServerSideProps(context){

  const book = await getBookById(context.params.id)

  if(!book){
    return{
      redirect:{
        destination: '/404'
      }
    }
  }

  const author = await getAuthorById(book.authorId)

  return {
    props:{
      Author: author
    }
  }
}

export default SpecificBooksAuthor;
