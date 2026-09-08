const express = require('express');
const musicController = require('../Controllers/music.controller');
const authMiddleWare = require("../Middlewares/auth.middleware")
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})


const router = express.Router();

// Create a new music entry
router.post('/upload', authMiddleWare.authArtist, upload.single('music'), musicController.createMusic);

// post api route
router.post("/album", authMiddleWare.authArtist, musicController.createAlbum);

router.get("/", authMiddleWare.authUser, musicController.getAllMusics);

router.get("/albums", authMiddleWare.authUser, musicController.getAllAlbums);

router.get("/albums/:albumId", authMiddleWare.authUser,musicController.getAlbumById);





module.exports = router;