const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;

const books = [
    {
        title: 'The Clean Code',
        author: 'Robert C. Martin'
    },
    {
        title: 'The Pragmatic Programmer',
        author: 'Andy Hunt and Dave Thomas'
    },
    {
        title: 'Domain-Driven Development',
        author: 'Eric Evans'
    }
]

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
})

app.listen(port, () => {
    console.log(`App listening in port ${port}`);
});