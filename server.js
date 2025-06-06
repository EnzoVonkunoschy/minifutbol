const express = require('express')
const path = require('path')
const app = express()
const Seguridad = require('./seguridad.js')
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Middleware global para loguear cada petición y método
//app.use((req, res, next) => {
  //  console.log('Método:', req.method, 'Ruta:', req.url);
   // next();
//});

// --- Menú login y menú --------------------------------

app.get ('/',(req, res)=>{
    res.render('login.ejs',{url : "http://localhost:3000", token:"lkjrt4v3wmtiqoprmmor98"})
})

// Ruta que recibe los datos del formulario de login
app.post('/menu', (req, res) => {
    // Extraemos los datos enviados desde el formulario (login.ejs)
    const { usuario, contrasena, token } = req.body;
    // Definimos el valor correcto del token que se debe verificar
    const tokenCorrecto = "lkjrt4v3wmtiqoprmmor98";

    // Validación de usuario, contraseña y token
    /**
     * Validación:
     * - El usuario debe ser "admin"
     * - La contraseña debe ser "admin"
     * - El token debe coincidir con el valor definido
     */
    if (usuario === "admin" && contrasena === "admin" && token === tokenCorrecto) {
        // Si todo es correcto, mostramos la vista 'menu.ejs' y pasamos el token y la url
        res.render('menu.ejs', {
            url: "http://localhost:3000",
            token: tokenCorrecto
        });
    } else {
        // Si los datos no son válidos, se muestra un mensaje de error directamente
        res.send(`
            <h2>Usuario, contraseña o token incorrectos</h2>
            <a href="/">Volver al login</a>
        `);
    }
});

app.post ('/menuGeneral', (req, res)=>{
    res.render('menu.ejs',{url : "http://localhost:3000", token:"lkjrt4v3wmtiqoprmmor98"})
})

app.post('/dameClientes', (req, res)=>{
    let resultado = Seguridad.dameClientes(req.body)
   if(resultado.success){
    res.render('listadoclientes.ejs',{url : "http://localhost:3000", token:"lkjrt4v3wmtiqoprmmor98",clientes: resultado.clientes})
}})


app.post('/dameTurno', (req, res) => {
let resultado = Seguridad.dameTurno(req.body)
    if (resultado.success){
        res.render('listadoturnos.ejs', {
            url: "http://localhost:3000",
            token:"lkjrt4v3wmtiqoprmmor98",
            turnos: resultado.turnos
        });
       
}})

// --- Usuarios ---------------------------------------

app.get('/usuarios', (req, res)=>{
    console.log(req.headers.token)
    console.log(req.body)
    res.send('http://localhost:3000')
})


// --- Clientes ---------------------------------------

app.post('/clientes', (req,res)=>{
    console.log(req.body)
    res.render('clientes.ejs',{url: "http://localhost:3000", token:"lkjrt4v3wmtiqoprmmor98" })
})

app.post('/api/clientes', (req, res)=>{
    console.log(req.body)
    let respuesta = Seguridad.nuevoCliente(req.body)
    if(respuesta.success){
        res.render('menu.ejs',{url : "http://localhost:3000", token:"lkjrt4v3wmtiqoprmmor98"})
    }
})

app.get ('/cliente',(req, res)=>{
    res.render('Cliente.ejs',{url : "http://localhost:3000"})
})


//eliminar cliente 
app.post('/btneliminarCliente', (req, res) => {
    //elimina el cliente seleccionado
    const respuesta = Seguridad.eliminarCliente(req.body);
    if (respuesta.success) {
        // Volver a mostrar el listado actualizado de clientes
        let resultado = Seguridad.dameClientes({token: req.body.token});
        res.render('listadoclientes.ejs', {
            url: "http://localhost:3000",
            token: req.body.token,
            clientes: resultado.clientes
        });
    } else {
        res.send(`
            <h2>Error al eliminar el cliente</h2>
            <a href="/">Volver al login</a>
        `);
    }
})


/* 
app.post('/nuevocliente',(req, res)=>{
    console.log(req.body)

    Seguridad.nuevoCliente(req.body)

    res.send(JSON.stringify(req.body))
})*/


// --- Turnos ------------------------------------------
app.post('/turnos', (req, res) => {
    // Leer turnos desde el archivo
    let turnos = [];
    try {
        const strTurnos = fs.readFileSync('./db/turnos.txt', 'utf-8');
        if (strTurnos) {
            turnos = JSON.parse(strTurnos);
        }
    } catch (e) {
        turnos = [];
    }
    // Leer clientes si es necesario
    let clientes = [];
    try {
        const strClientes = fs.readFileSync('./db/clientes.txt', 'utf-8');
        if (strClientes) {
            clientes = JSON.parse(strClientes);
        }
    } catch (e) {
        clientes = [];
    }
    res.render('index.ejs', {
        url: "http://localhost:3000",
        token: "lkjrt4v3wmtiqoprmmor98",
        turnos: turnos,
        clientes: clientes
    });
})

app.post('/nuevoturno',(req, res)=>{
    console.log(req.body)
    Seguridad.nuevoTurno(req.body)

    res.send(JSON.stringify(req.body))
})
//----------btn------------------
app.post('/btnVolver', (req, res) => {
    const respuesta = Seguridad.dameClientes(req.body);
    if (respuesta.success) {
        res.render('menu.ejs', {
            url: "http://localhost:3000",
            token: req.body.token
        });
    } else {
        res.send(`
            <h2>Token incorrecto</h2>
            <a href="/">Volver al login</a>
        `);
    }
});


// --- Volver --------------------------------------------

app.post('/volver', (req, res)=>{
    res.render('menu.ejs',{url : "http://localhost:3000", token:"lkjrt4v3wmtiqoprmmor98"})
})

const PORT = 3000
app.listen(PORT, ()=>{console.log(`Escuchando en el puerto  ${PORT} `)})