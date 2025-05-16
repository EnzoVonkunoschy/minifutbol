// clases.js
class Turno {
    constructor(dia, hora, libre, cliente) {
        this.dia = dia;
        this.hora = hora;
        this.libre = libre;
        this.cliente = cliente
    }

    setDia(dia) {
        this.dia = dia;
    }

    getDia(){
        return this.dia;
    }

    setHora(hora) {
        this.hora = hora;   
    }
    getHora(){
        return this.hora;
    }   
    setLibre(libre) {
        this.libre = libre;
    }
    getLibre(){
        return this.libre;
    }
    
   setCliente(cliente) {
        this.cliente = cliente;
    }
    getCliente(){
        return this.cliente;
    }
    
    static fromJSON(json) {
        const data = JSON.parse(json);
        const turno = new Turno(data.dia, data.hora, data.libre);
        if (data.cliente) {
            turno.setCliente(new Cliente(data.cliente.nombre, data.cliente.dni, data.cliente.telefono, data.cliente.cliente));
        }
        return turno;
    }


equals(turno){
    return (
        this.dia === turno.dia &&
        this.hora === turno.hora &&
        this.libre === turno.libre && 
        this.cliente === turno.cliente &&
    JSON.stringify(this.cliente) === JSON.stringify(turno.cliente)
    );
}
}

class Cliente{
    constructor(nombre,dni,telefono){
        this.nombre = nombre
        this.dni = dni;
        this.telefono = telefono;
    }

    setNombre(nombre){
        this.nombre = nombre;
    }

    getNombre(){
        return this.nombre;
    }
    setDni(dni){
        this.dni = dni;
    }
    getDni(){
        return this.dni;
    }
    setTelefono(telefono){
        this.telefono = telefono;
    }
    getTelefono(){
        return this.telefono;
    }
    static fromJSON(json) {
        const data = JSON.parse(json);
        return new Cliente(data.nombre, data.dni, data.telefono);
    }
}

module.exports = {Turno,Cliente};

