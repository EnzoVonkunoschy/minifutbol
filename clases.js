// clases.js
class Turno {
    constructor(dia, hora, libre) {
        this.dia = dia;
        this.hora = hora;
        this.libre = libre;
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

