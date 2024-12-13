# Trabajo-MongoDB

# Para correr el codigo debemos estar en una consola Command Promp y instalar express posteriormente debemos escribir el siguiente comando para correr el programa
node index.js

# Posterior a eso aparecerá el siguiente mensaje
Servidor corriendo en http:/192.168.1.87:3000 3000 (o en su defecto el mensaje que tu le hayas puesto).
Conectado a MongoDB correctamente

# Para crear un nuevo cliente utiliza la siguiente estructura usando un método POST
http://192.168.1.87:3000/crearClientes
{
    "nombre": "Juan Perez",
    "correo": "juan.perez@example.com",
    "telefono": "1234567890",
    "direccion": "Calle Falsa 123",
    "historialCompras": [
      {"Producto": "Televisor", "cantidad":1, "fecha": "2014-12-1"}
   ]
}

# Para obtener todos los clientes utiliza un método GET escribiendo lo siguiente
http://192.168.1.87:3000/clientes

# Ahora para actualizar un cliente escribe lo siguiente utilizando un método PUT
http://192.168.1.87:3000/clientes/:id
En la parte del :id recuerda reemplazarlo con el id del cliente que quieres editar
{
    "nombre": "Juan Actualizado",
    "telefono": "9876543210"
}

# Para eliminar un cliente utiliza la siguiente indicación usando un método DELETE
http://localhost:3000/eliminarClientes/:id
Aparecerá el siguiente mensaje: { "message": "Cliente eliminado" }
