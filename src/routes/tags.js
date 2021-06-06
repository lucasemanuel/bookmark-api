const express = require('express')
const TagController = require('../controllers/tag-controller')
const router = express.Router()

router.post('/', TagController.store)

module.exports = router
