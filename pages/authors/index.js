import React, { useEffect, useState } from 'react'
import styles from '@/styles/General.module.css'
import Author from '@/components/Authors/author';
import useSWR from 'swr';

const AuthorsPage = () => {

    const [authors, setAuthors] = useState('')

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data,error}=useSWR("https://books-app-32122-default-rtdb.firebaseio.com/authors.json",fetcher)

    useEffect(()=> {

        const authors=[]
        for(const key in data)
        {
            console.log(key)
            authors.push({
                id:key,
                ...data[key]
            })
        }
        setAuthors(authors)


    },[data])

    if(error){
        return <h2>Data Failed to Load</h2>
    }

    if(!data || !authors){
        return <h2>Loading</h2>
    }

  return (
    <div>
        <header className={styles.heading}>Authors Page</header>
        <ul>
            {authors.map(i => {
                return <l1> <Author author= {i}/> </l1>
            })}
        </ul>
    </div>
  )
}


export default AuthorsPage;
