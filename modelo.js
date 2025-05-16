const fs = require('fs')
const Clases = require('./clases.js')

function nuevoTurno(data){
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

function getClientes(){
    const cliente1 = new Clases.Cliente("Enzo Adrián 1",12345671,87654321)
    const cliente2 = new Clases.Cliente("Enzo Adrián 2",12345672,87654322)
    const cliente3 = new Clases.Cliente("Enzo Adrián 3",12345673,87654323)
    const arrayClientes = [cliente1, cliente2, cliente3]
    return arrayClientes
}
module.exports = {getClientes, nuevoTurno, nuevoCliente}