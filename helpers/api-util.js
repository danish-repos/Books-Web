export async function getAllBooks(){
    return fetch('https://books-app-32122-default-rtdb.firebaseio.com/books.json').then(res=>res.json()).then(data=>{
        
    const books=[]
        for(const key in data)
        {
            books.push({
                id:key,
                ...data[key]
            })
        }
        return books
    })
}

export async function getAllAuthors(){
    return fetch('https://books-app-32122-default-rtdb.firebaseio.com/authors.json').then(res=>res.json()).then(data=>{
        
    const authors=[]
        for(const key in data)
        {
            authors.push({
                id:key,
                ...data[key]
            })
        }
        return authors
    })
}

export async function getAllGenres(){
    return fetch('https://books-app-32122-default-rtdb.firebaseio.com/genres.json').then(res=>res.json()).then(data=>{
        
    const genres=[]
        for(const key in data)
        {
            genres.push({
                id:key,
                ...data[key]
            })
        }
        return genres
    })
}

export async function getAllReviews() {
  return fetch(
    "https://books-app-32122-default-rtdb.firebaseio.com/reviews.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const reviews = [];
      for (const key in data) {
        reviews.push({
          id: key,
          ...data[key],
        });
      }
      return reviews;
    });
}

export async function getAllUsers() {
  return fetch(
    "https://books-app-32122-default-rtdb.firebaseio.com/users.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const users = [];
      for (const key in data) {
        users.push({
          id: key,
          ...data[key],
        });
      }
      return users;
    });
}

export async function getReviewByBookId(id){
    const reviews = await getAllReviews()
    return reviews.filter(i=> i.bookId === id)
}


export async function getFeaturedBooks(){
    const books = await getAllBooks()
    return books.filter(i=> i.isFeatured)
}


export async function getBookById(id){
    const books = await getAllBooks()
    return books.find((i) => i.id === id)
}

export async function getAuthorById(id){
    const authors = await getAllAuthors()
    return authors.find((i) => i.id === id)
}