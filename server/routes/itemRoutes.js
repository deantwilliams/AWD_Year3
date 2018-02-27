var items = require('../controllers/itemAPIController');
var Item = require( '../models/itemModel' );
var express = require('express');
var router = express.Router();

router.get('/', items.list );
router.post('/', items.create );
router.patch('/:id',items.update);

module.exports = router;