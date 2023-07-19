const express = require('express');
const posts = require('./posts');
const users = require('./users')
const cors = require('cors')
const router = express.Router();


router.use(cors())

router.use('/', users);
router.use('/posts', posts);


module.exports = router;