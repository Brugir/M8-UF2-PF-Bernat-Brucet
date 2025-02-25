const mysql = require("mysql2");
const dbConfig = require("../config/mysql.config.js");

class Library {
  constructor() {
    // En el constructor, creamos una conexión a la base de datos
    // y la guardamos en la propiedad connection de la clase

    // 1.Declaramos la conexión
    let connection = mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB
    });

    // 2.Abrimos la conexión
    connection.connect(error => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
    });

    // 3.Dejamos la conexión en la propiedad connection, promisificada
    // (para poder utilizarlas más cómodamente en el resto de métodos de la clase)
    this.connection = connection.promise();
  }

  close = () => {
    this.connection.end();
  }


  // métodos de la clase Library
  listAll = async () => {
    console.log(this.connection)
    const [results, fields] = await this.connection.query("SELECT * FROM books");
    return results;
  }

  create = async (newBook) => {
    try {
        const [results] = await this.connection.query(
            "INSERT INTO books (title, author, year) VALUES (?, ?, ?)", 
            [newBook.title, newBook.author, newBook.year]
        );
        return results.affectedRows; // Verifica si las filas fueron afectadas
    } catch (error) {
        console.error("Error inserting book:", error);
        throw new Error("Database insert failed"); // Lanzamos el error para que se capture en el controlador
    }
};


  update = async (updBook) => {
    const {id, title, author, year} = updBook;
    try {
        const [results] = await this.connection.query(
            "UPDATE books SET title = ?, author = ?, year = ? WHERE id = ?", 
            [title, author, year, id]
        );
        return results.affectedRows > 0; // Devuelve `true` si se actualizó algo, `false` si no
    } catch (error) {
        console.error("Error updating book:", error);
        throw new Error("Database update failed"); // Lanza el error en lugar de devolverlo
    }
};


  delete = async (delBook) => {
    try {
        const [results] = await this.connection.query(
            "DELETE FROM books WHERE id = ?", 
            [delBook.id]  // Pasamos el ID correctamente
        );
        return results.affectedRows > 0; // Devuelve `true` si se eliminó algo
    } catch (error) {
        console.error("Error deleting book:", error);
        return false;
    }
}

}

module.exports = Library;