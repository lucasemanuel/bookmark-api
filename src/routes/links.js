const express = require('express')
const LinkController = require('../controllers/link-controller')
const router = express.Router()

router.get('/', LinkController.index)
router.post('/', LinkController.store)

module.exports = router
