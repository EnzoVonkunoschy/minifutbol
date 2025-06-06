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
    } catch (error) {
        console.error("Error en nuevoCliente:", error.message);
    }
}

function nuevoCliente(data) {
    console.log("--Controlador--")

    const unCliente = new Clases.Cliente(data.nombre,data.dni,data.telefono)
    console.log(unCliente)
    Modelo.nuevoCliente(unCliente)
    return {success: true}
}

function dameClientes(data){
    return Modelo.getClientes()
}

function eliminarCliente(data){
    console.log("--Controlador--")
    const dni = data.dni;
    if (!dni){
        console.error("DNI no proporcionado para eliminar cliente.");
        return { success: false, message: "DNI no proporcionado." };
    }else{
        //Elimino el cliente
        let clientes = Modelo.getClientes()
        clientes = clientes.filter(cliente => cliente.dni !== dni)
        Modelo.setClientes(clientes)
        console.log(`Cliente con DNI ${dni} eliminado.`);
        
        // Eliminar turnos del cliente
        let turnos = Modelo.getTurnos();
        turnos = turnos.filter(turno => turno.cliente.dni !== dni);
        Modelo.setTurnos(turnos);
        console.log(`Turno con DNI ${dni} eliminado.`);
        
        return {success: true}
    }  
}

module.exports = {eliminarCliente, dameClientes, nuevoTurno, nuevoCliente}

