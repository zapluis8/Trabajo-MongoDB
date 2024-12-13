//MARTINEZ PONCE LUIS ANGEL OBATALA

// Importar módulos necesarios
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
/** 
const cors = require("cors");

// Configuración de CORS
const corsOptions = {
    origin: "http://192.168.1.87:3000", // Permitir solicitudes desde esta IP
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
};

// Aplicar configuración de CORS
app.use(cors(corsOptions));

// El resto de tu configuración de la API
app.use(express.json());
*/
// Configuración de variables de entorno
dotenv.config();

// Constantes para el nombre de la base de datos y la colección
const dbName = "TrabajoMongoDB";
const collectionName = "Clientes";
const uri = "mongodb+srv://obatala:123@cluster0.w2wcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Inicializar la aplicación Express
app.use(bodyParser.json());

// Inicializar cliente MongoDB
let db;
(async () => {
    try {
        const client = new MongoClient(uri); // Eliminar opciones obsoletas
        await client.connect();
        db = client.db(dbName);
        console.log("Conectado a MongoDB correctamente");
    } catch (err) {
        console.error("Error al conectar a MongoDB:", err);
        process.exit(1);
    }
})();


// CRUD Endpoints

// Crear un cliente
app.post('/crearClientes', async (req, res) => {
    try {
        const cliente = req.body; // Obtener datos del cliente del cuerpo de la solicitud
        const result = await db.collection(collectionName).insertOne(cliente); // Insertar cliente en la colección
        cliente._id = result.insertedId; // Añadir el ID generado al cliente
        res.status(201).send(cliente); // Responder con el cliente creado
    } catch (err) {
        res.status(400).send({ error: err.message }); // Manejo de errores en la creación
    }
});


// Obtener todos los clientes
app.get('/clientes', async (req, res) => {
    try {
        const clientes = await db.collection(collectionName).find().toArray(); // Obtener todos los documentos de la colección
        res.status(200).send(clientes); // Responder con la lista de clientes
    } catch (err) {
        res.status(500).send({ error: err.message }); // Manejo de errores al obtener clientes
    }
});

// Actualizar un cliente por ID
app.put('/clientes/:id', async (req, res) => {
    try {
        const id = req.params.id; // Obtener ID del cliente
        const cliente = req.body; // Obtener datos actualizados del cliente
        const result = await db.collection(collectionName).findOneAndUpdate(
            { _id: new ObjectId(id) }, // Filtro por ID
            { $set: cliente }, // Datos a actualizar
            { returnDocument: 'after' } // Devuelve el documento modificado
        );
        if (!result.value) {
            return res.status(404).send({ error: 'Cliente no encontrado' }); // Cliente no encontrado
        }
        res.send(result.value); // Responder con el cliente actualizado
    } catch (err) {
        res.status(400).send({ error: err.message }); // Manejo de errores en la actualización
    }
});

// Eliminar un cliente por ID
app.delete('/eliminarCliente/:id', async (req, res) => {
    try {
        const id = req.params.id; // Obtener ID del cliente
        const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) }); // Eliminar cliente por ID
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Cliente no encontrado' }); // Cliente no encontrado
        }
        res.send({ message: 'Cliente eliminado' }); // Confirmar eliminación
    } catch (err) {
        res.status(500).send({ error: err.message }); // Manejo de errores en la eliminación
    }
});

// Servidor en escucha
const PORT = process.env.PORT || 3000; // Puerto para la API
app.listen(PORT, "192.168.1.87", () => {
    console.log('Servidor corriendo en http://192.168.1.87:3000 ' + PORT); // http://192.168.1.87:3000/ruta
});

/*
Documentación de la API:

1. POST /crearClientes
   Descripción: Crea un nuevo cliente.
   Ejemplo de cuerpo (JSON):
   {
       "nombre": "Juan Perez",
       "correo": "juan.perez@example.com",
       "telefono": "1234567890",
       "direccion": "Calle Falsa 123",
       "historialCompras": [
           { "producto": "Televisor", "cantidad": 1, "fecha": "2024-12-01" }
       ]
   }

2. GET /clientes
   Descripción: Obtiene todos los clientes registrados.

3. PUT /clientes/:id
   Descripción: Actualiza la información de un cliente por su ID.
   Ejemplo de cuerpo (JSON):
   {
       "nombre": "Juan Actualizado",
       "telefono": "9876543210"
   }

4. DELETE /eliminarCliente/:id
   Descripción: Elimina un cliente por su ID.
*/
