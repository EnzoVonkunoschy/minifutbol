// clases.js
class Turno {
    constructor(dia, hora, libre, cliente) {
        this.dia = dia;
        this.hora = hora;
        this.libre = libre;
        this.cliente = cliente;
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

    FromJSON(json) {
        const obj = JSON.parse(json);
        this.dia = obj.dia;
        this.hora = obj.hora;
        this.libre = obj.libre;
        this.cliente = new Cliente(obj.cliente.nombre, obj.cliente.dni, obj.cliente.telefono);
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