const express = require('express')
//a good video on router and MVC  https://www.youtube.com/watch?v=zW_tZR0Ir3Q&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=12&ab_channel=TheNetNinja
const router = express.Router();
// This is where we will be requiring the User and ensureAuth, so I don't believe we'll need it in the server anymore? (VKB)
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//import multer
//the middleware in this handler is multer grabbing the file data
//100% not sure how it works
const upload = require('../middleware/multer');
//still need the upload here
const postContollers = require('../controllers/post')

router.post('/create-post', upload.single('file'), postContollers.createPost);

router.get(':/id', ensureAuth, postContollers.renderPost);

router.delete('/deletePost/:id', postControllers.deletePost);

router.put('/likePost/:id', postContollers.likePost);

router.put('./dislikePost/:id', postContollers.dislikePost);

router.delete('/deleteUsersandPosts', postControllers.deleteUsersandPosts);

router.post('/ptofileUpload', upload.single('file'), postControllers.uploadProPic)

module.exports =- router