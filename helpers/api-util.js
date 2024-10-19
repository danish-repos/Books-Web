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


export async function getBookById(id){
    const books = await getAllBooks()
    return books.find((i) => i.id === id)
}

export async function getAuthorById(id){
    const authors = await getAllAuthors()
    return authors.find((i) => i.id === id)
}