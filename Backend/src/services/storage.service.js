const { ImageKit } = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

})

async function uploadFile(file) {
    try{
        
        // console.log("Uploading to ImageKit...");

    const result = await ImageKitClient.files.upload({
        file,
        // fileName: "music_" + Date.now(),
        fileName: "music_" + Date.now() + ".mp3",
        folder: "yt-complete-backend/music"
    })

        // console.log("ImageKit result:", result);

    return result;
    }catch(error) {
        // console.error("IMAGEKIT ERROR:", error);
        throw error;
    }
}



module.exports = { uploadFile };
