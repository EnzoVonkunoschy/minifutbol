const Clases = require('./clases.js')
const Modelo = require('./modelo.js');


function nuevoTurno(data) {
   try {
        console.log("--Controlador--");
        const libre = data.libre === 'libre';
        if (!data.dia || !data.turno || !data.libre || !data.cliente) {
            throw new Error("Datos incompletos para crear un turno.");
        }
                // Verifica si el turno ya existe
        const existeTurno = Modelo.getTurnos()
        if (existeTurno.some(t => String(t.dia) === String(data.dia) && String(t.hora) === String(data.turno))) {
              console.log("Fecha y turno  ocupado");
            throw new Error("Fecha y turno  ocupado");
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
/*
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
}*/

function nuevoCliente(data) {
    console.log("--Controlador--")
    const clientesExistentes = Modelo.getClientes();
    //verifica si el cliente ya existe 
     if (clientesExistentes.some(cliente => String(cliente.dni) === String(data.dni))) {
            console.log("Ya existe un cliente con ese DNI")
            return { success: false, message:"Ya existe un cliente con ese DNI" };
        }
    const unCliente = new Clases.Cliente(data.nombre,data.dni,data.telefono)
    console.log(unCliente)
    Modelo.nuevoCliente(unCliente)
    return {success: true}
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

function listarTurnos(data){
    return Modelo.getTurnos()
}


function eliminarTurno(data){
    console.log("--Controlador Eliminar Turno--")
    console.log(data)
    const dia = data.dia;
     const hora = data.turno;

    if (!dia || !hora){
        console.error("Dia u hora no proporcionado para eliminar turno.");
        return { success: false, message: "Dia y hora no proporcionado." };
    }else{
       
        
        // Eliminar turno
        let turnos = Modelo.getTurnos();
        turnos = turnos.filter(turno => turno.dia !== dia || turno.hora !==hora);
        Modelo.setTurnos(turnos);
        console.log(`Turno eliminado.`);
        
        return {success: true}
    }  
}

//--- USUARIOS ----------------------

function nuevoUsuario(data){
    console.log("--Controlador--")
    const usuariosExistentes = Modelo.getUsuarios();
    //verifica si el usuario.contacto ya existe 
     if (usuariosExistentes.some(usuario => usuario.contacto === data.contacto)) {
            console.log("Ya existe un usuario con este número de contacto")
            return { success: false, message:"Ya existe un usuario con ese Contacto" };
        }
    const unUsuario = new Clases.Usuario(data.nombre,data.contacto,data.pass,data.rol)
    console.log(unUsuario)
    Modelo.nuevoUsuario(unUsuario)
    return {success: true}
}

function eliminarUsuario(data){
    console.log("--Controlador eliminarUsuario--");
    let usuarios = Modelo.getUsuarios(); //leemos el archivo usuarios.txt
    // convierte el txt en un array de obj usuarios
 // Filtrar por contacto
    usuarios = usuarios.filter(u => u.contacto !== data.contacto);
    // solo nos quedamos con contactos que sean distintos a data.cont
    Modelo.setUsuarios(usuarios);
    // trae a set.usuarios p guardar de nuevo el txt
    console.log("holaaaaaaa");
    return { success: true, usuarios };

}

function dameUsuarios(data){
    return Modelo.getUsuarios()
}



module.exports = {nuevoUsuario, eliminarUsuario, dameUsuarios, eliminarCliente, dameClientes, nuevoTurno, nuevoCliente, listarTurnos, eliminarTurno}

