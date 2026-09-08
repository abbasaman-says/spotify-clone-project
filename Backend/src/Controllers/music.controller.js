const musicModel = require('../Models/music.model');
const { uploadFile } = require('../services/storage.service');
const albumMusicModel = require("../Models/album.model");
const jwt = require('jsonwebtoken');


//ak controller bnaya ha is ma artist music create krta ha agr koi user artist nhi ha wo music vreate nhi kr skta
async function createMusic(req, res) {
    // yha hmara token chek krny wala code tha wo remove kr dia q k us k lie ham ny middlware lgai file bnai ab ye token chek krny wala kam us file ma hga ye middleware kry ge

    // Create music
    const { title } = req.body;
    const file = req.file;


    // Upload file to ImageKit
    const result = await uploadFile(file.buffer.toString('base64'));


    // Create music document in database
    const music = await musicModel.create({
        uri: result.url,
        title,
        // artist: decoded.id
        artist: req.user.id,  //new code ha bad ma lkha ye opr wala phly tha
    });
    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    });
}

//yha b same controller bnaya token chek kia token ha ya nai agr jo token ha wo artist ka ha ya nai
async function createAlbum(req, res) {
    // yha hmara token chek krny wala code tha wo remove kr dia q k us k lie ham ny middlware lgai file bnai ab ye token chek krny wala kam us file ma hga ye middleware kry ge
    const { title, musics } = req.body;
    const album = await albumMusicModel.create({
        title,
        // artist: decoded.id,
        artist: req.user.id, // new code ha opr wala phly tha
        musics: musics,
    })
    res.status(201).json({
        message: "Album Created Successfully",
        album: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })
}

async function getAllMusics(req, res) {
    const musics = await musicModel
    .find()
    // .limit(2)
    .populate("artist", "username email")  

    res.status(200).json({
        message: "Musics fetched seccessfully",
        musics: musics,
    })
}

async function getAllAlbums(req, res) {
    const albums = await albumMusicModel.find().select("file artist").populate("artist", "username email")
    res.status(200).json({
        message: "Albums fetched successfully",
        albums : albums,
    })
}

async function getAlbumById(req, res){
    const albumId = req.params.albumId;

    const album = await albumMusicModel.findById(albumId).populate("artist", "username email").populate("musics")

    return res.status(200).json({
        message:"Album fetched successfully",
        album: album
    })
}



module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById };
