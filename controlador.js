const Clases = require('./clases.js')
const Modelo = require('./modelo.js')

function nuevoTurno(data) {
    try {
        console.log("--Controlador--");
        const libre = data.libre === 'Libre';
        const unTurno = new Clases.Turno(data.dia, data.turno, libre);
        console.log(unTurno);
        Modelo.nuevoTurno(unTurno);
    } catch (error) {
        console.error("Error al crear un nuevo turno:", error.message);
    }
}

function nuevoCliente(datos){
    console.log("--Controlador--")
    const unCliente = new Clases.Cliente(datos.nombre, datos.dni, datos.telefono)
    console.log(unCliente)
    Modelo.nuevoCliente(unCliente)
}

module.exports = {nuevoTurno, nuevoCliente}