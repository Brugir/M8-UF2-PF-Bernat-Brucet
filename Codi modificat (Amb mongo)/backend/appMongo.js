// appMongo.js
const express = require('express');
const cors = require('cors');

// Importa la conexión a MongoDB
require('./db/mongoConnection');  // Establece la conexión con MongoDB

// Importa las rutas de MongoDB
const routes = require('./routes/routesMongo');

const app = express();

// Configurar middleware
app.use(cors());          // para evitar CORS
app.use(express.json());  // para parsear contenido JSON
app.use('/', routes);     // para enrutar peticiones

// Arranque del servidor para MongoDB
app.listen(5001, () => {  // Cambié el puerto a 5001 para evitar conflictos
    console.log('MongoDB Server is listening on port 5001');
});
