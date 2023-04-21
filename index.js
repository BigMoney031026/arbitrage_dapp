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
let count = 0;
const con = require('./DB/mysql');
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

function setReward(){
    count  = count + 1;
    console.log(count)
    if(count == 24){
        try {
            const query = `SELECT * FROM usdcreward`;
                con.query(query, function (err, result1) {
                    if (err) throw err;
                    if (result1.length > 0) {
                        for(var i=0;i<result1.length;i++){
                            let amount = result1[i].rewardamount
                            let address = result1[i].userwalletaddress
                            console.log(amount,address,'USDC')
                            const q = `SELECT * FROM depositusdc WHERE useraddress='${result1[i].userwalletaddress}' AND (status='2' OR status='3')`;
                            con.query(q, function (err, result2) {
                                for(var j=0;j<result2.length;j++){
                                    amount = amount + result2[j].amount/100
                                }
                                    console.log(amount,'after USDC')
                                const q1 = `UPDATE usdcreward SET rewardamount = '${amount}' WHERE userwalletaddress='${address}'`;
                                con.query(q1, function (err, result3) {
                                    console.log(result3)
                                    if (err) throw err;
                                })
                            })
                        }
                    }
            })
            const queryUsdt = `SELECT * FROM usdtreward`;
            con.query(queryUsdt, function (err, result1) {
                if (result1.length > 0) {
                    for(var i=0;i<result1.length;i++){
                        let address = result1[i].userwalletaddress
                        let amount = result1[i].rewardamount
                        console.log(amount,address,'USDT')
                        const q = `SELECT * FROM depositusdt WHERE useraddress='${result1[i].userwalletaddress}' AND (status='2' OR status='3')`;
                        con.query(q, function (err, result2) {
                            for(var j=0;j<result2.length;j++){
                                amount = amount + result2[j].amount/100
                            }
                            console.log(amount,'after USDT')
                            const q1 = `UPDATE usdtreward SET rewardamount = '${amount}' WHERE userwalletaddress='${address}'`;
                            con.query(q1, function (err, result3) {
                            })
                        })
                    }
                }
            })
            } catch (error) {
                console.log(error)
            }
            count == 0
    }
    setTimeout(function(){
        setReward()
    },3600*1000)
}
setReward()
let server = http.createServer(app);
const portHttp = process.env.HTTP || 80;
server.listen({ port: portHttp, host:'0.0.0.0' }, ()=>console.log(`Started http service on port ${portHttp}`))
