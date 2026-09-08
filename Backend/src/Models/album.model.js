const mongoose = require("mongoose");

const albumMusicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    musics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Music"
    }],

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const albumMusicModel = mongoose.model("album", albumMusicSchema)

module.exports =  albumMusicModel