const express = require('express');
const app = express();
const port = 8080;
app.use(express.json())

let booksArr = [
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "publication_year": 1960,
        "genre": "Fiction",
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell",
        "publication_year": 1949,
        "genre": "Dystopian",
    },
    {
        "id": 3,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "publication_year": 1925,
        "genre": "Fiction",
    },
];

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.status(201).send(`Body received : ${req.body}`)
})

app.get('/api/books', (req, res) => {
    let { year, genre } = req.query;
    if(year && genre)
        {res.status(200).send(
            booksArr.filter(book=>book.publication_year == year)
                    .filter(book=>book.genre == genre))}
    else if(year)
        {res.status(200).send(booksArr.filter(book=>book.publication_year == year))}
    else if(genre)
        {res.status(200).send(booksArr.filter(book=>book.genre == genre))}
    else
        {res.status(200).send(booksArr)}
})

app.get('/api/books/:id', (req, res) => {
    const found = booksArr.find(book => book.id == req.params.id);
    console.log(req.params.id, found, booksArr[1].id)
    found?res.status(200).send(found):
    res.status(404).send(`Book Id: ${req.params.id} Not Found!`)
})

app.post('/api/books', (req, res) => {
    console.log(`Adding Book: ${req.body.title}`)
    let newLength = booksArr.push(req.body)
    res.status(201).send(`Book Added: ${booksArr[newLength-1].title}`)
})

app.patch('/api/books', (req, res) => {
    console.log(`Updating Book by Id: ${req.body.id}  Name: ${req.body.title}`)
    const found = booksArr.find(book => book.id === req.body.id);

    if(found)
    {
        const index = booksArr.indexOf(found);
        booksArr[index] = req.body;
        res.status(201).send(`Book Updated!  Id: ${booksArr[index].id}  Name: ${booksArr[index].title}`)
        console.log(`Updated Book: Id: ${booksArr[index].id}  Name: ${booksArr[index].title}`)
    }
    else
    {
        res.status(404).send(`Book Id: ${req.body.id} Not Found!!!!`)
        console.log(`Book Update Failed. Book Id: ${req.body.id} Not Found!!!!`)
    }
})



app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))