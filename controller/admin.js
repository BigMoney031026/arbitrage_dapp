const m = require("../model/admin");
exports.login = (req, res) => {
    m.login(req, res);
}
exports.getDepositUsdtTransactionAdmin = (req, res) => {
    m.getDepositUsdtTransactionAdmin(req, res);
}
exports.updateDepositUsdtTransactionAdmin = (req, res) => {
    m.updateDepositUsdtTransactionAdmin(req, res);
}

exports.getDepositUsdcTransactionAdmin = (req, res) => {
    m.getDepositUsdcTransactionAdmin(req, res);
}
exports.updateDepositUsdcTransactionAdmin = (req, res) => {
    m.updateDepositUsdcTransactionAdmin(req, res);
}

exports.getWithdrawTransactionAdmin = (req, res) => {
    m.getWithdrawTransactionAdmin(req, res);
}
exports.updateWithdrawTransactionAdmin = (req, res) => {
    m.updateWithdrawTransactionAdmin(req, res);
}

exports.getRewardUsdtTransactionAdmin = (req, res) => {
    m.getRewardUsdtTransactionAdmin(req, res);
}
exports.updateRwardUsdtTransactionAdmin = (req, res) => {
    m.updateRwardUsdtTransactionAdmin(req, res);
}


exports.getRewardUsdcTransactionAdmin = (req, res) => {
    m.getRewardUsdcTransactionAdmin(req, res);
}
exports.updateRwardUsdcTransactionAdmin = (req, res) => {
    m.updateRwardUsdcTransactionAdmin(req, res);
}