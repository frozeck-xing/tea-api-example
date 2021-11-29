const express = require('express');
const multer = require('multer');
const teaController = require('../controllers/tea');

const router = express.Router();
const upload = multer();

// '/tea' routes
router.post('/tea', upload.none(), teaController.newTea);
router.get('/tea', teaController.getAllTeas);
router.delete('/tea', teaController.deleteAllTeas);

// '/tea/:name' routes
router.post('/tea/:name', teaController.newComment);
router.get('/tea/:name', teaController.getOneTea);
router.delete('/tea/:name', teaController.deleteOneTea);


module.exports = router;
