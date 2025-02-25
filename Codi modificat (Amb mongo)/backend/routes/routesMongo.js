const express = require('express');
const router = express.Router();
const LibraryMongo = require('../models/LibraryMongo');

// Obtener todos los libros
router.get('/api/books', async (req, res) => {
    try {
        const books = await LibraryMongo.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear un libro
router.post('/api/books', async (req, res) => {
    const book = new LibraryMongo({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un libro
router.delete('/api/books', async (req, res) => {
    try {
        const book = await LibraryMongo.findByIdAndDelete(req.body._id);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json({ message: 'Libro eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Editar un libro
router.put('/api/books', async (req, res) => {
    try {
        const book = await LibraryMongo.findById(req.body._id);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        // Actualizamos los campos del libro
        book.title = req.body.title;
        book.author = req.body.author;
        book.year = req.body.year;

        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
