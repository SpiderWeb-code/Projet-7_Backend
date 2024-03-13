const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import correct du middleware d'authentification

const stuffCtrl = require('../controllers/stuff');

router.get('/books', auth, stuffCtrl.getAllStuff);
router.post('/books', auth, stuffCtrl.createThing);
router.get('/books/:id', auth, stuffCtrl.getOneThing);
router.put('/books/:id', auth, stuffCtrl.modifyThing);
router.delete('/books/:id', auth, stuffCtrl.deleteThing);

module.exports = router