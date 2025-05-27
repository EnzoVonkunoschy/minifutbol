// clases.js
class Turno {
    constructor(dia, hora, libre) {
        this.dia = dia;
        this.hora = hora;
        this.libre = libre;
        this.cliente = cliente;
    }

    get dia(){
        return this.dia
    }
    set dia(nuevoDia){
        this.dia = nuevoDia
    }

    get hora(){
        return this.hora
    }
    set hora(nuevaHora){
        this.hora = nuevaHora
    }

    get libre(){
        return this.libre
    }
    set libre(nuevoEstado){
        this.libre = nuevoEstado
    }              

    get cliente(){
        return this.cliente
    }
    set cliente(nuevoCliente){
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