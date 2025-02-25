// db/mongoConnection.js
const mongoose = require('mongoose');

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.5', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión a MongoDB exitosa');
}).catch(err => {
    console.error('Error al conectar con MongoDB:', err);
});
