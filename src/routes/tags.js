const express = require('express')
const router = express.Router()
const TagController = require('../controllers/tag-controller')
const TagValidator = require('../validators/tag-validator')

router.get('/', TagController.index)
router.post('/', TagValidator.store, TagController.store)
router.put('/:id', TagValidator.store, TagController.update)
router.delete('/:id', TagController.destroy)

module.exports = router
