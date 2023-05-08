const con = require('../DB/mysql');
// Deposit and withdraw control
exports.depositUsdt = async (req, res) => {
    const { userAddress, depositAddress, assets, amount } = req.body;
    try {
        const q = `SELECT * FROM usdtreward WHERE userwalletaddress='${userAddress}'`
        con.query(q, function (err, result1) {
            if(result1.length==0){
                const que = `INSERT INTO usdtreward (userwalletaddress, rewardAmount) VALUES ('${userAddress}','${0}')`;
                con.query(que, function (err, result) {});
            }
            const query = `INSERT INTO depositusdt (useraddress, depositaddress, assets, amount) VALUES ('${userAddress}' , '${depositAddress}' , 'SUI','${amount}' )`;
            con.query(query, function (err, result) {
                res.send("success");
            });
        });
    } catch (error) {
        console.log(error)
    }
};
exports.depositUsdc = async (req, res) => {
    const { userAddress, depositAddress, assets, amount } = req.body;
    try {
        const q = `SELECT * FROM usdcreward WHERE userwalletaddress='${userAddress}'`
        con.query(q, function (err, result1) {
            if(result1.length==0){
                const que = `INSERT INTO usdcreward (userwalletaddress, rewardAmount) VALUES ('${userAddress}','${0}')`;
                con.query(que, function (err, result) {});
            }
            const query = `INSERT INTO depositusdc (useraddress, depositaddress, assets, amount) VALUES ('${userAddress}' , '${depositAddress}' , '${assets}','${amount}' )`;
            con.query(query, function (err, result) {
                if (err) throw err
                res.send("success");
            });
        });
    } catch (error) {
        console.log(error)
    }
};

exports.depositRewardUsdt = async (req, res) => {
    const { userAddress, depositAddress, assets, amount } = req.body;
    try {
        const q = `SELECT * FROM getrewardusdt WHERE useraddress='${userAddress}' AND status='1'`;
        con.query(q,function(error,result1){
            if(result1.length>0){
                res.send("pending");
            }else{
                const query = `INSERT INTO depositusdt (useraddress, depositaddress, assets, amount) VALUES ('${userAddress}' , '${depositAddress}' , 'SUI','${amount}' )`;
                con.query(query, function (err, result) {
                    const que = `UPDATE usdtreward SET rewardamount = '0' WHERE userwalletaddress='${userAddress}'`;
                            con.query(que, function (err, result1) {
                                if(err) throw err;
                                res.send("success")
                    })
                })
            };
        })
    } catch (error) {
        console.log(error)
    }
};
exports.depositRewardUsdc = async (req, res) => {
    const { userAddress, depositAddress, assets, amount } = req.body;
    try {
        const q = `SELECT * FROM getrewardusdc WHERE useraddress='${userAddress}' AND status='1'`;
        con.query(q,function(error,result1){
            if(result1.length>0){
                res.send("pending");
            }else{
                const query = `INSERT INTO depositusdc (useraddress, depositaddress, assets, amount) VALUES ('${userAddress}' , '${depositAddress}' , '${assets}','${amount}' )`;
                con.query(query, function (err, result) {
                    const que = `UPDATE usdcreward SET rewardamount = '0' WHERE userwalletaddress='${userAddress}'`;
                            con.query(que, function (err, result1) {
                                if(err) throw err;
                                res.send("success")
                    })
                })
            };
        })
    } catch (error) {
        console.log(error)
    }
};

exports.withdrawUsdc = (req, res) => {
    const {withdrawAddress, assets } = req.body;
    try {
        const q = `SELECT * FROM depositusdc WHERE useraddress='${withdrawAddress}' AND status='2'`;
            con.query(q, function (err, result1) {
                if (err) throw err;
                if (result1.length > 0) {
                    let amount = 0;
                    for(var i=0;i<result1.length;i++){
                         amount = amount + result1[i].amount
                         const q1 = `UPDATE depositusdc SET status = '4' WHERE id='${result1[i].id}'`;
                         con.query(q1, function (err, result2) {
                             if (err) throw err;
                         })
                    }
                    const query = `INSERT INTO withdraw (useraddress, assets, amount) VALUES ('${withdrawAddress}' , '${assets}','${amount}' )`;
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
        const q = `SELECT * FROM depositusdt WHERE useraddress='${withdrawAddress}' AND status='2'`;
            con.query(q, function (err, result1) {
                if (err) throw err;
                if (result1.length > 0) {
                    let amount = 0;
                    for(var i=0;i<result1.length;i++){
                         amount = amount + result1[i].amount
                         const q1 = `UPDATE depositusdt SET status = '4' WHERE id='${result1[i].id}'`;
                         con.query(q1, function (err, result2) {
                             if (err) throw err;
                         })
                    }
                    const query = `INSERT INTO withdraw (useraddress, assets, amount) VALUES ('${withdrawAddress}' , 'SUI','${amount}' )`;
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
        const q = `SELECT * FROM depositusdc WHERE useraddress='${userAddress}' UNION SELECT * FROM depositusdt WHERE useraddress='${userAddress}' UNION SELECT * FROM withdraw WHERE userAddress='${userAddress}' UNION SELECT * FROM getrewardusdc WHERE userAddress='${userAddress}' UNION SELECT * FROM getrewardusdt WHERE userAddress='${userAddress}' ORDER BY time DESC`;
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
        let totalStake = 0
        let totalReward = 0
        let totalInvestors = 0
        const q = `SELECT * FROM depositusdc`;
        con.query(q, function (err, result) {
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    totalStake = totalStake+result[i].amount
                    totalInvestors = result.length
                }
            }
            const query = `SELECT * FROM usdcreward`;
                con.query(query, function (err, result) {
                    if(result.length>0)
                    {
                        for(var i=0;i<result.length;i++){
                            totalReward = totalReward+result[i].rewardamount
                        }
                        res.send({totalInvestors: totalInvestors, totalStake:totalStake, totalReward: totalReward})
                    }else{
                        res.send({totalInvestors: totalInvestors, totalStake:totalStake, totalReward: totalReward})
                    }
                })
        });
        } catch (error) {
            console.log(error)
        }
};
exports.getStakingInfoUsdt = (req, res) => {
    try {
        const q = `SELECT * FROM depositusdt`;
        let totalStake = 0
        let totalReward = 0
        let totalInvestors = 0
        con.query(q, function (err, result) {
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    totalStake = totalStake+result[i].amount
                    totalInvestors = result.length
                }
            }
            const query = `SELECT * FROM usdtreward`;
                con.query(query, function (err, result) {
                    if(result.length>0)
                    {
                        for(var i=0;i<result.length;i++){
                            totalReward = totalReward+result[i].rewardamount
                        }
                        res.send({totalInvestors:totalInvestors, totalStake:totalStake, totalReward: totalReward})
                    }else{
                        res.send({totalInvestors:totalInvestors, totalStake:totalStake, totalReward: totalReward})
                    }
                })
        });
        } catch (error) {
            console.log(error)
        }
};
exports.getRewardAmount = (req, res) => {
    try {
        const {userAddress} = req.body;
        const q = `SELECT * FROM depositusdt WHERE useraddress='${userAddress}' AND status='2'`;
        const query = `SELECT * FROM depositusdc WHERE useraddress='${userAddress}' AND status='2'`;
        let totalRewardUsdt = 0
        let totalRewardUsdc = 0
        con.query(q, function (err, result) {
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    totalRewardUsdt = totalRewardUsdt+result[i].amount
                }
            }else{
                totalRewardUsdt = 0
            }
        });
        con.query(query, function (err, result1) {
            if(result1.length>0){
                for(var i=0;i<result1.length;i++){
                    totalRewardUsdc = totalRewardUsdc+result1[i].amount
                }
            }else{
                totalRewardUsdc = 0
            }
            res.send({totalRewardUsdt: totalRewardUsdt/100, totalRewardUsdc:totalRewardUsdc/100})
        })
        } catch (error) {
            console.log(error)
        }
};
exports.getTotalMyDepositAmount = (req, res) => {
    try {
        const {userAddress} = req.body;
        const q = `SELECT * FROM depositusdt WHERE useraddress='${userAddress}' AND (status='2' OR status='3')`;
        const query = `SELECT * FROM depositusdc WHERE useraddress='${userAddress}' AND (status='2' OR status='3')`;
        let totalUsdt = 0
        let totalUsdc = 0
        con.query(q, function (err, result) {
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    totalUsdt = totalUsdt+result[i].amount
                }
            }else{
                totalUsdt = 0
            }
        });
        con.query(query, function (err, result1) {
            if(result1.length>0){
                for(var i=0;i<result1.length;i++){
                    totalUsdc = totalUsdc+result1[i].amount
                }
            }else{
                totalUsdc = 0
            }
            res.send({totalUsdt: totalUsdt, totalUsdc:totalUsdc})
        })
        } catch (error) {
            console.log(error)
        }
};
exports.getTotalRewardAmount = (req, res) => {
    try {
        const {userAddress} = req.body;
        const q = `SELECT * FROM usdcreward WHERE userwalletaddress='${userAddress}'`;
        const query = `SELECT * FROM usdtreward WHERE userwalletaddress='${userAddress}'`;
        let totalRewardUsdt = 0
        let totalRewardUsdc = 0
        con.query(q, function (err, result) {
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    totalRewardUsdc = totalRewardUsdc+result[i].rewardamount
                }

            }else{
                totalRewardUsdc = 0
            }
            con.query(query, function (err, result1) {
                if(result1.length>0){
                    for(var i=0;i<result1.length;i++){
                        totalRewardUsdt = totalRewardUsdt+result1[i].rewardamount
                    }
                }else{
                    totalRewardUsdt = 0
                }
                res.send({totalRewardUsdt: totalRewardUsdt, totalRewardUsdc:totalRewardUsdc})
            })
        });
        } catch (error) {
            console.log(error)
        }
};

exports.claimRewardUsdt = async (req, res) => {
    const { userAddress} = req.body;
    try {
        const q1 = `UPDATE usdtreward SET rewardamount = '${0}' WHERE userwalletaddress='${userAddress}'`;
            con.query(q1, function (err, result2) {
            })
    } catch (error) {
        console.log(error)
    }
};
exports.claimRewardUsdc = async (req, res) => {
    const { userAddress} = req.body;
    try {
        const q1 = `UPDATE usdcreward SET rewardamount = '${0}' WHERE userwalletaddress='${userAddress}'`;
            con.query(q1, function (err, result2) {
            })
    } catch (error) {
        console.log(error)
    }
};
exports.getUsdcRwardRquest = async (req, res) => {
    const { userAddress,assets,amount} = req.body;
    try {
        const q = `SELECT * FROM getrewardusdc WHERE useraddress='${userAddress}' AND status='1'`;
        con.query(q,function(error,result1){
            if(result1.length>0){
                res.send("pending");
            }else{
                const query = `INSERT INTO getrewardusdc (useraddress, assets, amount) VALUES ('${userAddress}' , 'SUI','${amount}' )`;
                con.query(query, function (err, result) {
                    res.send("success");
                });
            }
        })
       
    } catch (error) {
        console.log(error)
    }
};
exports.getUsdtRwardRquest = async (req, res) => {
    const { userAddress,assets,amount} = req.body;
    try {
        const q = `SELECT * FROM getrewardusdt WHERE useraddress='${userAddress}' AND status='1'`;
        con.query(q,function(error,result1){
        if(result1.length>0){
            res.send("pending");
        }else{
            const query = `INSERT INTO getrewardusdt (useraddress, assets, amount) VALUES ('${userAddress}' , 'SUI','${amount}' )`;
            con.query(query, function (err, result) {
                res.send("success");
            });
          }
        })
    } catch (error) {
        console.log(error)
    }
};

// Admin update Control
exports.updateUsdt = async (req, res) => {
    const { id,status } = req.body;
    try {
        const q = `SELECT * FROM depositusdt WHERE id='${id}'`;
        con.query(q, function (err, result1) {
            if (result1.length > 0) {
                    const q1 = `UPDATE depositusdt SET status = '${status}' WHERE id='${id}'`;
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
        const q = `SELECT * FROM depositusdc WHERE id='${id}'`;
        con.query(q, function (err, result1) {
            if (result1.length > 0) {
                    const q1 = `UPDATE updateusdc SET status = '${status}' WHERE id='${id}'`;
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
