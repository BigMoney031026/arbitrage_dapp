const con = require('../DB/mysql');
// Deposit and withdraw control
exports.depositUsdt = async (req, res) => {
    const { userAddress, depositAddress, assets, amount } = req.body;
    try {
        const query = `INSERT INTO depositUsdt (userAddress, depositAddress, assets, amount) VALUES ('${userAddress}' , '${depositAddress}' , '${assets}','${amount}' )`;
        con.query(query, function (err, result) {
            if (err) throw err
            res.send("success");
        });
    } catch (error) {
        console.log(error)
    }
};
exports.depositUsdc = async (req, res) => {
    const { userAddress, depositAddress, assets, amount } = req.body;
    try {
        const query = `INSERT INTO depositUsdc (userAddress, depositAddress, assets, amount) VALUES ('${userAddress}' , '${depositAddress}' , '${assets}','${amount}' )`;
        con.query(query, function (err, result) {
            if (err) throw err
            res.send("success");
        });
    } catch (error) {
        console.log(error)
    }
};
exports.withdrawUsdc = (req, res) => {
    const {withdrawAddress, assets } = req.body;
    try {
        const q = `SELECT * FROM depositUsdc WHERE userAddress='${withdrawAddress}' AND status='2'`;
            con.query(q, function (err, result1) {
                if (err) throw err;
                if (result1.length > 0) {
                    let amount = 0;
                    for(var i=0;i<result1.length;i++){
                         amount = amount + result1[i].amount
                         const q1 = `UPDATE depositUsdc SET status = '4' WHERE id='${result1[i].id}'`;
                         con.query(q1, function (err, result2) {
                             if (err) throw err;
                         })
                    }
                    console.log(amount)
                    const query = `INSERT INTO withdraw (userAddress, assets, amount) VALUES ('${withdrawAddress}' , '${assets}','${amount}' )`;
                    con.query(query, function (err, result) {
                        if (err) throw err
                        res.send("success");
                    });
                }else{
                    res.send("noExit");
                }
        })
        } catch (error) {
            console.log(error)
        }
};
exports.withdrawUsdt = (req, res) => {
    const {withdrawAddress, assets } = req.body;
    try {
        const q = `SELECT * FROM depositUsdt WHERE userAddress='${withdrawAddress}' AND status='2'`;
            con.query(q, function (err, result1) {
                if (err) throw err;
                if (result1.length > 0) {
                    let amount = 0;
                    for(var i=0;i<result1.length;i++){
                         amount = amount + result1[i].amount
                         const q1 = `UPDATE depositUsdt SET status = '4' WHERE id='${result1[i].id}'`;
                         con.query(q1, function (err, result2) {
                             if (err) throw err;
                         })
                    }
                    console.log(amount)
                    const query = `INSERT INTO withdraw (userAddress, assets, amount) VALUES ('${withdrawAddress}' , '${assets}','${amount}' )`;
                    con.query(query, function (err, result) {
                        if (err) throw err
                        res.send("success");
                    });
                }else{
                    res.send("noExit");
                }
        })
        } catch (error) {
            console.log(error)
        }
};
exports.getTransactionHistory = (req, res) => {
    const {userAddress} = req.body;
    try {
        const q = `SELECT * FROM depositUsdc WHERE userAddress='${userAddress}' UNION SELECT * FROM depositUsdt WHERE userAddress='${userAddress}' UNION SELECT * FROM withdraw WHERE userAddress='${userAddress}' ORDER BY time DESC`;
        con.query(q, function (err, result) {
            if (err) throw err
            res.send(result)
        });
        } catch (error) {
            console.log(error)
        }
};
exports.getStakingInfoUsdc = (req, res) => {
    try {
        const q = `SELECT * FROM depositUsdc`;
        con.query(q, function (err, result) {
            if(result.length>0){
                let totalStake = 0
                for(var i=0;i<result.length;i++){
                    totalStake = totalStake+result[i].amount
                }
                res.send({totalInvestors: result.length, totalStake:totalStake})
            }else{
                res.send({totalInvestors: 0, totalStake:0})
            }
        });
        } catch (error) {
            console.log(error)
        }
};
exports.getStakingInfoUsdt = (req, res) => {
    try {
        const q = `SELECT * FROM depositUsdt`;
        con.query(q, function (err, result) {
            if(result.length>0){
                let totalStake = 0
                for(var i=0;i<result.length;i++){
                    totalStake = totalStake+result[i].amount
                }
                res.send({totalInvestors: result.length, totalStake:totalStake})
            }else{
                res.send({totalInvestors: 0, totalStake:0})
            }
        });
        } catch (error) {
            console.log(error)
        }
};



// Admin update Control
exports.updateUsdt = async (req, res) => {
    const { id,status } = req.body;
    try {
        const q = `SELECT * FROM depositUsdt WHERE id='${id}'`;
        con.query(q, function (err, result1) {
            if (result1.length > 0) {
                    const q1 = `UPDATE depositUsdt SET status = '${status}' WHERE id='${id}'`;
                    con.query(q1, function (err, result2) {
                        if (err) throw err;
                        res.send("success")
                    })
            } else {
                res.send('noExist');
            }
        })
    } catch (error) {
        console.log(error)
    }
};
exports.updateUsdc = async (req, res) => {
    const { id,status } = req.body;
    try {
        const q = `SELECT * FROM updateUsdc WHERE id='${id}'`;
        con.query(q, function (err, result1) {
            if (result1.length > 0) {
                    const q1 = `UPDATE updateUsdc SET status = '${status}' WHERE id='${id}'`;
                    con.query(q1, function (err, result2) {
                        if (err) throw err;
                        res.send("success")
                    })
            } else {
                res.send('noExist');
            }
        })
    } catch (error) {
        console.log(error)
    }
};
exports.updateWithdraw = async (req, res) => {
    const { id,status } = req.body;
    try {
        const q = `SELECT * FROM withdraw WHERE id='${id}'`;
        con.query(q, function (err, result1) {
            if (result1.length > 0) {
                    const q1 = `UPDATE withdraw SET status = '${status}' WHERE id='${id}'`;
                    con.query(q1, function (err, result2) {
                        if (err) throw err;
                        res.send("success")
                    })
            } else {
                res.send('noExist');
            }
        })
    } catch (error) {
        console.log(error)
    }
};
//Reward control
exports.getUsdtRewardAmount = async (req, res) => {
    const { walletAddress} = req.body;
    try {
        const query =  `SELECT * FROM depositUsdt WHERE userAddress='${walletAddress}'`;
        con.query(query, function (err, result) {
            if (err) throw err
            const usdtReward = 0
            res.send(usdtReward);
        });
    } catch (error) {
        console.log(error)
    }
};
exports.getUsdcRewardAmount = async (req, res) => {
    const { walletAddress} = req.body;
    try {
        const query =  `SELECT * FROM depositUsdc WHERE userAddress='${walletAddress}'`;
        con.query(query, function (err, result) {
            if (err) throw err
            const usdcReward = 0
            res.send(usdcReward);
        });
    } catch (error) {
        console.log(error)
    }
};