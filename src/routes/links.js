const express = require('express')
const LinkController = require('../controllers/link-controller')
const LinkValidator = require('../validators/link-validator')
const router = express.Router()

router.get('/', LinkController.index)
router.post('/', LinkValidator.store, LinkController.store)
router.put('/:id', LinkController.update)
router.delete('/:id', LinkController.destroy)

module.exports = router
