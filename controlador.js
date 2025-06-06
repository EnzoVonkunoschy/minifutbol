const Clases = require('./clases.js');
const Modelo = require('./modelo.js');

function nuevoTurno(data) {
    try {
        console.log("--Controlador--");
        const libre = data.libre === 'libre';
        if (!data.dia || !data.turno || !data.libre || !data.cliente) {
            throw new Error("Datos incompletos para crear un turno.");
        }
        const extrae = /^(.+?) - DNI: (\d+) - Tel: (\d+)$/;
        const match = data.cliente.match(extrae);
        if (!match) {
            throw new Error("Formato de cliente inválido.");
        }
        const nombre = match[1];
        const dni = match[2];
        const telefono = match[3];
        const cliente = new Clases.Cliente(nombre, dni, telefono);
        const unTurno = new Clases.Turno(data.dia, data.turno, data.libre, cliente);
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
        return { success: true };
    } catch (error) {
        console.error("Error en nuevoCliente:", error.message);
        return { success: false, error: error.message };
    }
}

function dameClientes(data){
    return Modelo.getClientes();
}

function eliminarCliente(dni) {
    return Modelo.eliminarCliente(dni);
}

module.exports = { dameClientes, nuevoTurno, nuevoCliente, eliminarCliente };