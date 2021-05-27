const express = require('express')
const LinkController = require('../controllers/link-controller')
const router = express.Router()

router.get('/', LinkController.index)
router.post('/', LinkController.store)
router.put('/:id', LinkController.update)
router.delete('/:id', LinkController.destroy)

module.exports = router
