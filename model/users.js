const con = require('../DB/mysql');
// Deposit and withdraw control
exports.depositUsdt = async (req, res) => {
    const { userAddress, depositAddress, assets, amount } = req.body;
    try {
        const q = `SELECT * FROM usdtReward WHERE userWalletAddress='${userAddress}'`
        con.query(q, function (err, result1) {
            if(result1.length==0){
                const que = `INSERT INTO usdtReward (userWalletAddress, rewardAmount) VALUES ('${userAddress}','${0}')`;
                con.query(que, function (err, result) {});
            }
        });
        const query = `INSERT INTO depositUsdt (userAddress, depositAddress, assets, amount) VALUES ('${userAddress}' , '${depositAddress}' , '${assets}','${amount}' )`;
        con.query(query, function (err, result) {
            res.send("success");
        });
    } catch (error) {
        console.log(error)
    }
};
exports.depositUsdc = async (req, res) => {
    const { userAddress, depositAddress, assets, amount } = req.body;
    try {
        const q = `SELECT * FROM usdcReward WHERE userWalletAddress='${userAddress}'`
        con.query(q, function (err, result1) {
            if(result1.length==0){
                const que = `INSERT INTO usdcReward (userWalletAddress, rewardAmount) VALUES ('${userAddress}','${0}')`;
                con.query(que, function (err, result) {});
            }
        });
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
        let totalStake = 0
        let totalReward = 0
        let totalInvestors = 0
        const q = `SELECT * FROM depositUsdc`;
        con.query(q, function (err, result) {
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    totalStake = totalStake+result[i].amount
                    totalInvestors = result.length
                }
            }
            const query = `SELECT * FROM usdcReward`;
                con.query(query, function (err, result) {
                    if(result.length>0)
                    {
                        for(var i=0;i<result.length;i++){
                            totalReward = totalReward+result[i].rewardAmount
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
        const q = `SELECT * FROM depositUsdt`;
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
            const query = `SELECT * FROM usdtReward`;
                con.query(query, function (err, result) {
                    if(result.length>0)
                    {
                        for(var i=0;i<result.length;i++){
                            totalReward = totalReward+result[i].rewardAmount
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
        const q = `SELECT * FROM depositUsdt WHERE userAddress='${userAddress}' AND status='2'`;
        const query = `SELECT * FROM depositUsdc WHERE userAddress='${userAddress}' AND status='2'`;
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
exports.getTotalRewardAmount = (req, res) => {
    try {
        const {userAddress} = req.body;
        const q = `SELECT * FROM usdcReward WHERE userWalletAddress='${userAddress}'`;
        const query = `SELECT * FROM usdtReward WHERE userWalletAddress='${userAddress}'`;
        let totalRewardUsdt = 0
        let totalRewardUsdc = 0
        con.query(q, function (err, result) {
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                    totalRewardUsdc = totalRewardUsdc+result[i].rewardAmount
                }
            }else{
                totalRewardUsdc = 0
            }
        });
        con.query(query, function (err, result1) {
            if(result1.length>0){
                for(var i=0;i<result1.length;i++){
                    totalRewardUsdt = totalRewardUsdt+result1[i].rewardAmount
                }
            }else{
                totalRewardUsdt = 0
            }
            res.send({totalRewardUsdt: totalRewardUsdt, totalRewardUsdc:totalRewardUsdc})
        })
        } catch (error) {
            console.log(error)
        }
};

exports.claimRewardUsdt = async (req, res) => {
    const { userAddress} = req.body;
    try {
        const q1 = `UPDATE usdtReward SET rewardAmount = '${0}' WHERE userWalletAddress='${userAddress}'`;
            con.query(q1, function (err, result2) {
            })
    } catch (error) {
        console.log(error)
    }
};
exports.claimRewardUsdc = async (req, res) => {
    const { userAddress} = req.body;
    try {
        const q1 = `UPDATE usdcReward SET rewardAmount = '${0}' WHERE userWalletAddress='${userAddress}'`;
            con.query(q1, function (err, result2) {
            })
    } catch (error) {
        console.log(error)
    }
};
exports.getUsdcRwardRquest = async (req, res) => {
    const { userAddress,assets,amount} = req.body;
    try {
        const q = `SELECT * FROM getRewardUsdc WHERE userAddress='${userAddress}' AND status='1'`;
        con.query(q,function(error,result1){
            if(result1.length>0){
                res.send("pending");
            }else{
                const query = `INSERT INTO getRewardUsdc (userAddress, assets, amount) VALUES ('${userAddress}' , '${assets}','${amount}' )`;
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
        const q = `SELECT * FROM getRewardUsdt WHERE userAddress='${userAddress}' AND status='1'`;
        con.query(q,function(error,result1){
        if(result1.length>0){
            res.send("pending");
        }else{
            const query = `INSERT INTO getRewardUsdt (userAddress, assets, amount) VALUES ('${userAddress}' , '${assets}','${amount}' )`;
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
        const q = `SELECT * FROM depositUsdc WHERE id='${id}'`;
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
