const router = require('express').Router()

router.use('/links', require('./links'))
router.use('/tags', require('./tags'))

module.exports = router
