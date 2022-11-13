const m = require("../model/users");
exports.depositUsdt = (req, res) => {
    m.depositUsdt(req, res);
}
exports.depositUsdc = (req, res) => {
    m.depositUsdc(req, res);
}
exports.depositRewardUsdt = (req, res) => {
    m.depositRewardUsdt(req, res);
}
exports.depositRewardUsdc = (req, res) => {
    m.depositRewardUsdc(req, res);
}
exports.withdrawUsdc = (req, res) => {
    m.withdrawUsdc(req, res);
}
exports.withdrawUsdt = (req, res) => {
    m.withdrawUsdt(req, res);
}
exports.getTransactionHistory = (req, res) => {
    m.getTransactionHistory(req, res);
}
exports.getStakingInfoUsdc = (req, res) => {
    m.getStakingInfoUsdc(req, res);
}
exports.getStakingInfoUsdt = (req, res) => {
    m.getStakingInfoUsdt(req, res);
}
exports.getRewardAmount = (req, res) => {
    m.getRewardAmount(req, res);
}
exports.getTotalRewardAmount = (req, res) => {
    m.getTotalRewardAmount(req, res);
}
exports.claimRewardUsdt = (req, res) => {
    m.claimRewardUsdt(req, res);
}
exports.claimRewardUsdc = (req, res) => {
    m.claimRewardUsdc(req, res);
}
exports.getUsdcRwardRquest = (req, res) => {
    m.getUsdcRwardRquest(req, res);
}
exports.getUsdtRwardRquest = (req, res) => {
    m.getUsdtRwardRquest(req, res);
}
exports.getTotalMyDepositAmount = (req, res) => {
    m.getTotalMyDepositAmount(req, res);
}


exports.updateUsdt = (req, res) => {
    m.up(req, res);
}
exports.updateUsdc = (req, res) => {
    m.updateUsdc(req, res);
}
exports.updateWithdraw = (req, res) => {
    m.updateWithdraw(req, res);
}
exports.getUsdtRewardAmount = (req, res) => {
    m.getUsdtRewardAmount(req, res);
}
exports.getUsdcRewardAmount = (req, res) => {
    m.getUsdcRewardAmount(req, res);
}
exports.memReg = (req, res) => {
    m.memReg(req, res);
}
