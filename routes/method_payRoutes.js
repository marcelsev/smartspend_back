const express = require('express');
const router = express.Router();
const method_payController = require('../controllers/method_payController');


router.post('/methodpay', method_payController.createMethod_pay);


module.exports = router;