const Clases = require('./clases.js')
const modelo = require('./modelo.js')



function nuevoTurno(data){

    try{
        console.log("--controlador--");
        const libre = data.libre === 'Libre';
        const unTurno = new Clases.turno(data.dia, data.turno, libre);
        console.log(unTurno);
        modelo.nuevoTurno (unTurno);
    }catch (error){
        console.error("error al crear un nueco turno: ", error.message)

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
    } catch (error) {
        console.error("Error en nuevoCliente:", error.message);
    }
}

module.exports = {nuevoTurno,nuevoCliente}