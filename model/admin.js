const con = require('../DB/mysql');
const md5 = require('md5')
// Deposit and withdraw control
exports.login = async (req, res) => {
    const { userName, userPass} = req.body;
    const password = md5(userPass)
    try {
        console.log(md5(userPass))
        const query = `SELECT * FROM admin WHERE username='${userName}' AND password='${password}'`
        con.query(query, function (err, result1) {
            if (err) throw err;
            if(result1.length>0){
                res.send("success")
            }else{
                res.send("fail")
            }
        });
    } catch (error) {
        console.log(error)
    }
};
exports.getDepositUsdtTransactionAdmin = async (req, res) => {
    try {
        const q = `SELECT * FROM depositusdt ORDER BY time DESC`
        con.query(q, function (err, result) {
            res.send(result)
        });
       
    } catch (error) {
        console.log(error)
    }
};

exports.updateDepositUsdtTransactionAdmin = async (req, res) => {
    const { id,type } = req.body;
    try {
        const query = `UPDATE depositusdt SET status = '${type}' WHERE id='${id}'`;
        con.query(query, function (err, result2) {
            if (err) throw err;
            console.log(result2)
            res.send("success")
        })
       
    } catch (error) {
        console.log(error)
    }
};


exports.getDepositUsdcTransactionAdmin = async (req, res) => {
    try {
        const q = `SELECT * FROM depositusdc ORDER BY time DESC`
        con.query(q, function (err, result) {
            res.send(result)
        });
       
    } catch (error) {
        console.log(error)
    }
};

exports.updateDepositUsdcTransactionAdmin = async (req, res) => {
    const { id,type } = req.body;
    try {
        const query = `UPDATE depositusdc SET status = '${type}' WHERE id='${id}'`;
        con.query(query, function (err, result2) {
            if (err) throw err;
            console.log(result2)
            res.send("success")
        })
       
    } catch (error) {
        console.log(error)
    }
};


exports.getWithdrawTransactionAdmin = async (req, res) => {
    try {
        const q = `SELECT * FROM withdraw ORDER BY time DESC`
        con.query(q, function (err, result) {
            res.send(result)
        });
       
    } catch (error) {
        console.log(error)
    }
};

exports.updateWithdrawTransactionAdmin = async (req, res) => {
    const { id,type } = req.body;
    try {
        const query = `UPDATE withdraw SET status = '${type}' WHERE id='${id}'`;
        con.query(query, function (err, result2) {
            if (err) throw err;
            console.log(result2)
            res.send("success")
        })
       
    } catch (error) {
        console.log(error)
    }
};



exports.getRewardUsdtTransactionAdmin = async (req, res) => {
    try {
        const q = `SELECT * FROM getrewardusdt ORDER BY time DESC`;
        con.query(q, function (err, result) {
            res.send(result)
        });
       
    } catch (error) {
        console.log(error)
    }
};

exports.updateRwardUsdtTransactionAdmin = async (req, res) => {
    const { id,type,amount } = req.body;
    try {
        if(type == 2||type == 4){
            const query = `UPDATE getrewardusdt SET status = '${type}' WHERE id='${id}'`;
            con.query(query, function (err, result2) {
                if (err) throw err;
                const q = `SELECT * FROM getrewardusdt WHERE id='${id}'`;
                con.query(q, function (err, result) {
                    if(err) throw err;
                    console.log(result)
                    if(result.length>0){
                    const que = `UPDATE usdtreward SET rewardamount = '0' WHERE userwalletaddress='${result[0].useraddress}'`;
                    con.query(que, function (err, result1) {
                        if(err) throw err;
                        res.send("success")
                    })
                }else{
                    res.send("fail")
                }
                });
               
            })
        }else{
            const query = `UPDATE getrewardusdt SET status = '${type}' WHERE id='${id}'`;
            con.query(query, function (err, result2) {
                if (err) throw err;
                res.send("success")
            })
        }
       
       
    } catch (error) {
        console.log(error)
    }
};

exports.getRewardUsdcTransactionAdmin = async (req, res) => {
    try {
        const q = `SELECT * FROM getrewardusdc ORDER BY time DESC`;
        con.query(q, function (err, result) {
            res.send(result)
        });
       
    } catch (error) {
        console.log(error)
    }
};

exports.updateRwardUsdcTransactionAdmin = async (req, res) => {
    const { id,type,amount } = req.body;
    try {
        if(type == 2||type == 4){
            const query = `UPDATE getrewardusdc SET status = '${type}' WHERE id='${id}'`;
            con.query(query, function (err, result2) {
                if (err) throw err;
                const q = `SELECT * FROM getrewardusdc WHERE id='${id}'`;
                con.query(q, function (err, result) {
                    if(err) throw err;
                    console.log(result)
                    if(result.length>0){
                    const que = `UPDATE usdcreward SET rewardamount = '0' WHERE userwalletaddress='${result[0].useraddress}'`;
                    con.query(que, function (err, result1) {
                        if(err) throw err;
                        res.send("success")
                    })
                }else{
                    res.send("fail")
                }
                });
               
            })
        }else{
            const query = `UPDATE getrewardusdt SET status = '${type}' WHERE id='${id}'`;
            con.query(query, function (err, result2) {
                if (err) throw err;
                res.send("success")
            })
        }
       
       
    } catch (error) {
        console.log(error)
    }
};