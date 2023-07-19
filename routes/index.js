const express = require('express');
const posts = require('./posts');
const users = require('./users')
const cors = require('cors')
const router = express.Router();


router.use(cors({
    origin: 'https://escapediary-fe-delta.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }));

router.use('/', users);
router.use('/posts', posts);


module.exports = router;