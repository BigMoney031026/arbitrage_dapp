const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const urlencoded = require('body-parser').urlencoded;
const cors = require('cors');
// db connect
const con = require('./DB/mysql');
require("dotenv").config();
app.use(cors());
const json = require('body-parser');
app.use(json());
app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
//Routes
app.use('/', require('./routes/router'));
app.use(express.static(path.normalize(__dirname + '/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})

setInterval(function(){
    try {
        const query = `SELECT * FROM usdcreward`;
            con.query(query, function (err, result1) {
                if (err) throw err;
                if (result1.length > 0) {
                    for(var i=0;i<result1.length;i++){
                        let amount = result1[i].rewardamount
                        let address = result1[i].userwalletaddress
                        const q = `SELECT * FROM depositusdc WHERE useraddress='${result1[i].userwalletaddress}' AND status='2'`;
                        con.query(q, function (err, result2) {
                            for(var j=0;j<result2.length;j++){
                                amount = amount + result2[j].amount
                            }
                            const q1 = `UPDATE usdcreward SET rewardamount = '${amount}' WHERE userwalletaddress='${address}'`;
                            con.query(q1, function (err, result2) {
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
                    const q = `SELECT * FROM depositusdt WHERE useraddress='${result1[i].userwalletaddress}' AND status='2'`;
                    con.query(q, function (err, result2) {
                        console.log(result2)
                        for(var j=0;j<result2.length;j++){
                            amount = amount + result2[j].amount
                        }
                        console.log(amount)
                        const q1 = `UPDATE usdtreward SET rewardamount = '${amount}' WHERE userwalletaddress='${address}'`;
                        con.query(q1, function (err, result2) {
                        })
                    })
                }
            }
        })
        } catch (error) {
            console.log(error)
        }
},60*60*24*1000)
const PORT = process.env.PORT || 80;
app.listen(PORT, console.log("Server has started at port " + PORT))