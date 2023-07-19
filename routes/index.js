const express = require('express');
const router = express.Router();
const posts = require('./posts');
const users = require('./users');
// const cors = require('cors')

// router.use(cors({
//     origin: '*'
//   }));

router.use('/', users);
router.use('/posts', posts);

module.exports = router;
