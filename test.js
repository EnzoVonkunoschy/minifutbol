const { Turno } = require('./clases.js')

function testTurno(){
    const miTurno = new Turno("lunes",2,true)
    console.log(miTurno.dia == 'lunes')
    console.log(miTurno.hora == 2)
    console.log(miTurno.libre == true)
}
function testCliente() {
    const miTurno = new Turno("lunes", 2, true);
    console.log(miTurno.dia === 'lunes');
    console.log(miTurno.hora === 2);
    console.log(miTurno.libre === true);
}
function tesGetClientes() {
    const modelo = require('./modelo.js')
    
    const clientes = modelo.getClientes()
    console.log("Clientes:")
    console.log(clientes)
}
//testCliente();
//testTurno();
tesGetClientes();

