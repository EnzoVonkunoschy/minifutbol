// clases.js
class Turno {
    constructor(dia, hora, libre) {
        this.dia = dia;
        this.hora = hora;
        this.libre = libre;
        //this.cliente = Cliente;
    }

    get Dia(){
        return this.dia
    }
    set Dia(nuevoDia){
        this.dia = nuevoDia
    }

    get Hora(){
        return this.hora
    }
    set Hora(nuevaHora){
        this.hora = nuevaHora
    }

    get Libre(){
        return this.libre
    }
    set Libre(nuevoEstado){
        this.libre = nuevoEstado
    }              

    get Cliente(){
        return this.cliente
    }
    set Cliente(nuevoCliente){
        this.cliente = nuevoCliente
    }

    fromJSON(json){
        const {dia,hora,libre,cliente} = JSON.parse(json)
        this.dia = dia
        this.hora = hora
        this.libre = libre
        this.cliente = new Cliente(cliente.nombre, cliente.dni, cliente.telefono);
    }

}

class Cliente{
    constructor(nombre,dni,telefono){
        this.nombre = nombre
        this.dni = dni;
        this.telefono = telefono;
    }

    set Nombre(nombre) {
        this.nombre = nombre;
    }
    get Nombre() {
        return this.nombre;
    }

    set Dni(dni) {
        this.dni = dni;
    }
    get Dni() {
        return this.dni;
    }
    
    set Telefono(telefono) {
        this.telefono = telefono;
    }
    get Telefono() {
        return this.telefono;
    }
    
    FromJSON(json){
        let obj = JSON.parse(json)
        this.nombre = obj.nombre
        this.dni = obj.dni
        this.telefono = obj.telefono
    }
}

module.exports = {Turno,Cliente};