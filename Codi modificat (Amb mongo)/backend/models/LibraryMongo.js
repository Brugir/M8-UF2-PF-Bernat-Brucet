const mongoose = require('mongoose');

// Definir el esquema para el libro
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true }
});

// Crear el modelo de Book
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
