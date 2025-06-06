const fs = require('fs')
const Clases = require('./clases.js')

function nuevoTurno(data){
    if(data instanceof Clases.Turno){
        console.log("--Modelo--")
        let str_turnos = fs.readFileSync('./db/turnos.txt','utf-8')
        let turnos = []
        if(str_turnos){
            turnos = JSON.parse(str_turnos)
        }

        turnos.push(data)

        fs.writeFileSync('./db/turnos.txt',JSON.stringify(turnos))
        return {success: true}
    }
}

function nuevoCliente(data){
    if(data instanceof Clases.Cliente){
        console.log("--Modelo--")
        let str_cliente = fs.readFileSync('./db/clientes.txt','utf-8')
        let clientes = []
        if(str_cliente){
            clientes = JSON.parse(str_cliente)
        }

        clientes.push(data)

        fs.writeFileSync('./db/clientes.txt',JSON.stringify(clientes))
        return {success: true}
    }
}


function setClientes(clientes){
     // Convertir la colección de clientes a un array de objetos simples
const clientesJSON = clientes.map(c => ({

    nombre: c.nombre,
    dni: c.dni,
    telefono: c.telefono

}));
// Convertir a string JSON
const str_clientes = JSON.stringify(clientesJSON, null, 2);
// Guardar en el archivo
fs.writeFileSync('./db/clientes.txt', str_clientes, 'utf-8');

}


function getClientes(){
    let clientes = [];
    const str_cliente = fs.readFileSync('./db/clientes.txt','utf-8')
    if (str_cliente){
        let arClientes = JSON.parse(str_cliente)
            for (let i = 0; i < arClientes.length; i++){
                let c = arClientes[i]
                clientes.push(new Clases.Cliente(c.nombre, c.dni, c.telefono))
            }         
        }
        return clientes;
    }

    function eliminarCliente(dni){
        let clientes = getClientes()
        clientes = clientes.filter(c => c.dni !== dni)
        setClientes(clientes)

        let turnos = []
        try{
            const str_turnos = fs.readFileSync('./db/turnos.txt', 'utf-8')
            if (str_turnos) {
                turnos = JSON.parse(str_turnos)
            }
        } catch (e) {}
        turnos = turnos.filter(turno => !(turno.cliente && turno.cliente.dni === dni))
        fs.writeFileSync('./db/turnos.txt', JSON.stringify(turnos, null, 2), 'utf-8');
    
    return {success: true}
    }
module.exports = {getClientes, setClientes, nuevoTurno, nuevoCliente,eliminarCliente}