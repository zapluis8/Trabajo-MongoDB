# Trabajo-MongoDB

# Para correr el codigo debemos estar en una consola Command Promp y instalar express posteriormente debemos escribir el siguiente comando para correr el programa
node index.js

# Posterior a eso aparecerá el siguiente mensaje
Servidor corriendo en http:/[tu IP]:3000 3000 (esto es más como un mensaje de recordatorio).
Conectado a MongoDB correctamente
# Para agregar un nuevo cliente utiliza la siguiente estructura
http://[tu IP]:3000/clientes
{
    "nombre": "Juan Perez",
    "correo": "juan.perez@example.com",
    "telefono": "1234567890",
    "direccion": "Calle Falsa 123",
    "historialCompras": [
      {"Producto": "Televisor", "cantidad":1, "fecha": "2014-12-1"}
   ]
}
