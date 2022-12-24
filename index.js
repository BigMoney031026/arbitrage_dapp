const express = require('express');
const app = express();
const path = require('path')
// const bodyParser = require("body-parser");
// const urlencoded = require('body-parser').urlencoded;
const cors = require('cors');
const http = require('http')
// const https = require('https')
// const fs = require('fs')
// db connect
// let count = 0;
// const con = require('./DB/mysql');
require("dotenv").config();
app.use(cors());
// const json = require('body-parser');
// app.use('*', (req, res, next) => {
//     if (req.protocol==='http') {
//       return res.redirect('https://' + req.hostname + req.url)
//     }
//     next()
// })
// app.use(json());
app.use(express.json());

// parse requests of content-type - application/json
// app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());
app.set('view engine', 'html');
//Routes
app.use('/', require('./routes/router'));
app.use(express.static(path.normalize(__dirname + '/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})
let server = http.createServer(app);
const portHttp = process.env.HTTP || 6000;
server.listen({ port: portHttp, host:'0.0.0.0' }, ()=>console.log(`Started http service on port ${portHttp}`))
