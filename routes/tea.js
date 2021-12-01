const express = require('express');
const teaController = require('../controllers/tea');

const router = express.Router();

// '/tea' routes
router.post('/tea', teaController.uploadImg, teaController.newTea);
router.get('/tea', teaController.getAllTeas);
router.delete('/tea', teaController.deleteAllTeas);

// '/tea/:name' routes
router.post('/tea/:name', teaController.newComment);
router.get('/tea/:name', teaController.getOneTea);
router.delete('/tea/:name', teaController.deleteOneTea);


module.exports = router;
