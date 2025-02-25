// Importamos el modelo de datos
const Library = require('../models/Library')


// Declaración de controladores 
const getBooks = (async (req, res) => {
    try{
        // Instanciamos un modelo Library
        let library = new Library({});
        // Lo usamos para listar libros
        let books = await library.listAll();
        res.json(books);
        library.close();
    }
    catch{
        res.json("Error getting books...");
    }
})

const createBook = async (req, res) => {
    try {
        // Instanciamos un modelo Library
        let library = new Library({});

        // Creamos un libro nuevo
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        };

        // Usamos el modelo Library para crear libro
        let created = await library.create(newBook);

        if (created) {
            console.log("Product created successfully");
            res.json("Product created successfully");
        } else {
            console.log("Error creating new book...");
            res.status(400).json("Error creating new book...");
        }
        library.close();
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


const updateBook = (async (req, res) => {
    try {
        let library = new Library({});

        const updBook = {
            id: req.body.id,
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        };

        let updated = await library.update(updBook)

        if(updated) {res.json("Product updated successfully")}
        else {res.json("Error updating new book...")}
        
        library.close()
    }
    catch {res.json("Error updating new book...")}
})

const deleteBook = async (req, res) => {
    try {
        let library = new Library({});
        
        const delBook = { id: req.body.id };  // Obtenemos el ID desde el cuerpo

        let deleted = await library.delete(delBook); // Llamamos a la función de eliminación

        if (deleted) {
            res.json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ message: "Error: Book not found" });
        }

        library.close();
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    getBooks: getBooks,
    createBook: createBook,
    updateBook: updateBook,
    deleteBook: deleteBook
}