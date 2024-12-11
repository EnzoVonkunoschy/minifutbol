const express = require('express')
const path = require('path')
const app = express()
const Seguridad = require('./seguridad.js')

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get ('/',(req, res)=>{
    //res.send('<h1>Hola desde servidor Node</p>')
    res.render('index.ejs',{cohorte : "2023"})
    res.render('index.ejs',{url : "http://localhost:3000"})
})

app.post('/nuevoturno',(req, res)=>{
    console.log(req.body)

    Seguridad.nuevoTurno(req.body)

    res.send(JSON.stringify(req.body))
})

const PORT = 3000
app.listen(PORT, ()=>{console.log(`Escuchando en el puerto  ${PORT} `)})