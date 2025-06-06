const Clases = require('./clases.js')
const Modelo = require('./modelo.js')

function nuevoTurno(data) {
    try {
        console.log("--Controlador--");
        const libre = data.libre === 'libre';
        if (!data.dia || !data.turno || !data.libre || !data.cliente) {
            throw new Error("Datos incompletos para crear un turno.");
        }
        //Expresion regular para extraer los datos del string cliente
        const extrae = /^(.+?) - DNI: (\d+) - Tel: (\d+)$/;
        const match = data.cliente.match(extrae);
        //Si no hay coincidencias tira un error
        if (!match) {
            throw new Error("Formato de cliente inválido.");
        }
        //Si hay match guardo los datos
        const nombre = match[1];
        const dni = match[2];
        const telefono = match[3];
        //Creo el cliente y el turno
        const cliente = new Clases.Cliente(nombre, dni, telefono);
        const unTurno = new Clases.Turno(data.dia, data.turno, data.libre, cliente);
        //Imprimo el turno y lo guardo en el modelo
        console.log(unTurno);
        Modelo.nuevoTurno(unTurno);
    } catch (error) {
        console.error("Error al crear un nuevo turno:", error.message);
    }
}

function nuevoCliente(data) {
    try {
        console.log("--Controlador--");
        if (!data.nombre || !data.dni || !data.telefono) {
            throw new Error("Datos incompletos para crear un cliente.");
        }
        const unCliente = new Clases.Cliente(data.nombre, data.dni, data.telefono);
        console.log(unCliente);
        Modelo.nuevoCliente(unCliente);
        return {success: true};
    } catch (error) {
        console.error("Error en nuevoCliente:", error.message);
        return {success: false, message: error.message};
    }
}

function dameClientes(data){
    return Modelo.getClientes()
}

function dameTurno(data) {
    return Modelo.getTurnos()
}


function eliminarCliente(data) {
    console.log("--Controlador--");
    
    const clientes = Modelo.getClientes();
    //verifica si el cliente existe por DNI
    const clienteIndex = clientes.findIndex(c => String(c.dni) === String(data.dni));
    //Si el cliente existe lo elimina
    if (clienteIndex !== -1) {
        //elimina al cliente del array usuando el indice 
        clientes.splice(clienteIndex, 1);
        //llama el al array actualizado con setClientes
        Modelo.setClientes(clientes);
        return { success: true };
    } else {
        return { success: false, message: "Cliente no encontrado." };
    }


}

module.exports = {dameClientes, nuevoTurno, nuevoCliente, dameTurno, eliminarCliente}

