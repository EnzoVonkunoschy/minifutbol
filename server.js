const express = require('express')
const path = require('path')
const app = express()
const Seguridad = require('./seguridad.js')

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// --- Menú login y menú --------------------------------

app.get ('/',(req, res)=>{
    res.render('login.ejs',{url : "http://localhost:3000", token:"lkjrt4v3wmtiqoprmmor98"})
})


app.post('/menu', (req, res) => {
    console.log(req.body);
    if (req.body.token === "lkjrt4v3wmtiqoprmmor98") { // Requerimiento 002
        res.render('menu.ejs', { url: "http://localhost:3000", token: "lkjrt4v3wmtiqoprmmor98" });
    } else {
        res.render('menu.ejs', { url: "http://localhost:3000", token: "" });
    }
});


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

/* 
app.post('/nuevocliente',(req, res)=>{
    console.log(req.body)

    Seguridad.nuevoCliente(req.body)

    res.send(JSON.stringify(req.body))
})*/


// --- Turnos ------------------------------------------

app.get('/turnos', (req, res)=>{  // Requerimiento 001
    console.log(req.headers.token)
    console.log(req.body)
    res.send('<p>Menú de Turnos</p>')
})

app.post('/nuevoturno',(req, res)=>{
    console.log(req.body)
    Seguridad.nuevoTurno(req.body)

    res.send(JSON.stringify(req.body))
})

const PORT = 3000
app.listen(PORT, ()=>{console.log(`Escuchando en el puerto  ${PORT} `)})