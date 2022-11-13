const express = require('express');
const router = express.Router();
// **********Member***************
const sub = require('../controller/users');
router.post('/depositUsdt', sub.depositUsdt);
router.post('/depositUsdc', sub.depositUsdc);

router.post('/depositRewardUsdt', sub.depositRewardUsdt);
router.post('/depositRewardUsdc', sub.depositRewardUsdc);


router.post('/withdrawUsdc', sub.withdrawUsdc);
router.post('/withdrawUsdt', sub.withdrawUsdt);
router.post('/getTransactionHistory', sub.getTransactionHistory);
router.post('/getStakingInfoUsdc', sub.getStakingInfoUsdc);
router.post('/getStakingInfoUsdt', sub.getStakingInfoUsdt);
router.post('/getRewardAmount', sub.getRewardAmount);
router.post('/getTotalRewardAmount', sub.getTotalRewardAmount);
router.post('/claimRewardUsdt', sub.claimRewardUsdt);
router.post('/claimRewardUsdc', sub.claimRewardUsdc);
router.post('/getUsdcRwardRquest', sub.getUsdcRwardRquest);
router.post('/getUsdtRwardRquest', sub.getUsdtRwardRquest);
router.post('/getTotalMyDepositAmount', sub.getTotalMyDepositAmount);

const admin = require('../controller/admin');
router.post('/login', admin.login);
router.post('/getDepositUsdtTransactionAdmin', admin.getDepositUsdtTransactionAdmin);
router.post('/updateDepositUsdtTransactionAdmin', admin.updateDepositUsdtTransactionAdmin);

router.post('/getDepositUsdcTransactionAdmin', admin.getDepositUsdcTransactionAdmin);
router.post('/updateDepositUsdcTransactionAdmin', admin.updateDepositUsdcTransactionAdmin);

router.post('/getWithdrawTransactionAdmin', admin.getWithdrawTransactionAdmin);
router.post('/updateWithdrawTransactionAdmin', admin.updateWithdrawTransactionAdmin);


router.post('/getRewardUsdtTransactionAdmin', admin.getRewardUsdtTransactionAdmin);
router.post('/updateRwardUsdtTransactionAdmin', admin.updateRwardUsdtTransactionAdmin);


router.post('/getRewardUsdcTransactionAdmin', admin.getRewardUsdcTransactionAdmin);
router.post('/updateRwardUsdcTransactionAdmin', admin.updateRwardUsdcTransactionAdmin);


module.exports = router;