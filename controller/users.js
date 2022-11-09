const m = require("../model/users");
exports.depositUsdt = (req, res) => {
    m.depositUsdt(req, res);
}
exports.depositUsdc = (req, res) => {
    m.depositUsdc(req, res);
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
