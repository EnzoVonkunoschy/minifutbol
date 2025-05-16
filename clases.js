// clases.js
class Turno {
    constructor(dia, hora, libre) {
        this.dia = dia;
        this.hora = hora;
        this.libre = libre;
        this.Cliente = null;
    }
    setDia(dia) {
        this.dia = dia;
    }
    getDia() {
        return this.dia;
    }
    setHora(hora) {
        this.hora = hora;
    }
    getHora() {
        return this.hora;
    }   
    setLibre(libre) {
        this.libre = libre;
    }   
    getLibre() {
        return this.libre;
    }       
    setCliente(cliente) {
        if(cliente instanceof Cliente){
            this.Cliente = cliente;
        }  
        else{
            console.log("--------error---");
        }
    }
    getcliente(){
        return this.Cliente;
    }
    equals(turno){
        if(turno instanceof Turno){
            return false;
        }
     return this.dia == turno.dia && this.hora == turno.hora;
    } 
}      


class Cliente{
    constructor(nombre,dni,telefono){
        this.nombre = nombre
        this.dni = dni;
        this.telefono = telefono;
    }
    
}

module.exports = {Turno,Cliente};

