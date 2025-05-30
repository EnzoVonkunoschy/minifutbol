const Controlador = require('./controlador.js')

function nuevoTurno(data){
    console.log("--seguridad--")
    console.log(data)
    if(data.libre == undefined){
        data.libre = false
    }else{
        data.libre = true
    }
    console.log(data)

    if(data.token == "lkjrt4v3wmtiqoprmmor98"){
        const resultado = Controlador.dameClientes({});
        const clientes = resultado || [];
        const clienteEncontrado = clientes.find(c => c.dni == data.cliente);

        if (clienteEncontrado) {
            data.cliente = clienteEncontrado; // Asocia el objeto cliente al turno
        } else {
            data.cliente = null; 
        }

        
        Controlador.nuevoTurno(data)
        
        return {success: true}
    }{
        return {success: false}
    }
} 

function nuevoCliente(data){
    console.log("--seguridad--")
    console.log("data")
    console.log(data)
    if(data.token == 'lkjrt4v3wmtiqoprmmor98'){
        Controlador.nuevoCliente(data)
        return {success: true}
    }else{
        return {success: false}
    }
    
}

function dameClientes(data){
    console.log("--seguridad--")
    console.log("data")
    console.log(data)
    if(data.token == 'lkjrt4v3wmtiqoprmmor98'){
        const clientes = Controlador.dameClientes(data)
        return {success: true, clientes: clientes}

    }else{
        console.log("No se puede acceder a los clientes")
        return {success: false}
    }
    
}

module.exports = {dameClientes,nuevoTurno, nuevoCliente}