const fs = require('fs');
const Clases = require('./clases.js');

function nuevoTurno(data) {
    if (data instanceof Clases.Turno) {
        console.log("--Modelo--");
        let str_turnos = fs.readFileSync('./db/turnos.txt', 'utf-8');
        let turnos = [];
        if (str_turnos) {
            turnos = JSON.parse(str_turnos);
        }

        turnos.push(data);

        fs.writeFileSync('./db/turnos.txt', JSON.stringify(turnos));
        return { success: true };
    }
}

function nuevoCliente(data) {
    if (data instanceof Clases.Cliente) {
        console.log("--Modelo--");
        let str_cliente = fs.readFileSync('./db/clientes.txt', 'utf-8');
        let clientes = [];
        if (str_cliente) {
            clientes = JSON.parse(str_cliente);
        }

        clientes.push(data);

        fs.writeFileSync('./db/clientes.txt', JSON.stringify(clientes));
        return { success: true };
    }
}

function getClientes() {
    let clientes = [];
    const str_cliente = fs.readFileSync('./db/clientes.txt', 'utf-8');
    if (str_cliente) {
        let arClientes = JSON.parse(str_cliente);
        for (let i = 0; i < arClientes.length; i++) {
            let c = arClientes[i];
            clientes.push(new Clases.Cliente(c.nombre, c.dni, c.telefono));
        }
    }
    return clientes;
}

function eliminarCliente(dni) {
    console.log("--Modelo-- eliminarCliente");

    try {
        // Eliminar cliente
        const str_cliente = fs.readFileSync('./db/clientes.txt', 'utf-8');
        let clientes = str_cliente ? JSON.parse(str_cliente) : [];
        clientes = clientes.filter(c => c.dni !== dni);
        fs.writeFileSync('./db/clientes.txt', JSON.stringify(clientes));
    } catch (e) {
        console.error("Error procesando clientes.txt:", e.message);
        return { success: false };
    }

    try {
        // Eliminar turnos del cliente (protegido si falta campo cliente)
        const str_turnos = fs.readFileSync('./db/turnos.txt', 'utf-8');
        let turnos = str_turnos ? JSON.parse(str_turnos) : [];
        turnos = turnos.filter(t => !t.cliente || t.cliente.dni !== dni);
        fs.writeFileSync('./db/turnos.txt', JSON.stringify(turnos));
    } catch (e) {
        console.error("Error procesando turnos.txt:", e.message);
        return { success: false };
    }

    return { success: true };
}

module.exports = { getClientes, nuevoTurno, nuevoCliente, eliminarCliente };