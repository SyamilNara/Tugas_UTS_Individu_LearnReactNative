//import express validator
const { body, check } = require('express-validator');

// Definisikan validasi untuk create post
const validatePost = [
    check('image')
    .custom((value, { req }) => {
      if (req.method === 'POST' && !req.file) {
        throw new Error('Image is required');
      }
      return true;
    }),
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
];

module.exports = { validatePost }