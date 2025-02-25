// controllers/booksMongo.js
const Book = require('../models/LibraryMongo');  // Importa el modelo MongoDB

const getBooks = async (req, res) => {
    try {
        const books = await Book.find();  // Consulta todos los libros
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);  // Crea un nuevo libro
        const savedBook = await newBook.save();  // Guarda el libro en la base de datos
        res.json(savedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.body.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.body.id);  // Elimina el libro usando el ID
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook
};
