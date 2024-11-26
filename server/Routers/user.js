const express = require('express')
const router = express.Router()
const userContreoller = require('../Controllers/user')

router.post('/api/register',userContreoller.register)
module.exports = router