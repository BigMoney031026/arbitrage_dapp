const express = require('express');
const router = express.Router();
// **********Member***************
const sub = require('../controller/users');
router.post('/depositUsdt', sub.depositUsdt);
router.post('/depositUsdc', sub.depositUsdc);
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


router.post('/updateUsdt', sub.updateUsdt);
router.post('/updateUsdc', sub.updateUsdc);
router.post('/updateWithdraw', sub.updateWithdraw);

module.exports = router;