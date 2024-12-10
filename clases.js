// clases.js
class Turno {
    constructor(dia, hora, libre) {
        this.dia = dia;
        this.hora = hora;
        this.libre = libre;
    }
}


class Cliente {
    constructor(nombre, dni, telefono) {
        this.nombre = nombre
        this.dni = dni
        this.telefono = telefono
    }

    // mostrarTurno(){
    //     console.log(`Dia: ${this.dia} Hora: ${this.hora} libre: ${this.libre}`)
    // }
}

// const miTurno = new Turno("lunes",2,true)

// miTurno.mostrarTurno();

module.exports = {Turno, Cliente};
