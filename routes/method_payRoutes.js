const express = require('express');
const router = express.Router();
const method_payController = require('../controllers/method_payController');


router.post('/methodpay', method_payController.createMethod_pay);
router.get('/methodpay', method_payController.getMethod_pays);
router.get('/methodpay/:id', method_payController.getMethod_payById);
router.put('/methodpay/:id', method_payController.updateMethod_pay);
router.delete('/methodpay/:id', method_payController.deleteMethod_pay);

module.exports = router;