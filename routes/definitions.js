const express = require('express');
const router = express.Router();

const DefinitionsController = require('../controllers/definitions')
 
router.get('/', DefinitionsController.definitions_get_all);

router.get('/:definitionId', DefinitionsController.definitions_get);
router.post('/', DefinitionsController.definitions_create);

router.patch('/:definitionId', DefinitionsController.definitions_update);

router.delete('/:definitionId', DefinitionsController.definitions_delete);

module.exports = router;