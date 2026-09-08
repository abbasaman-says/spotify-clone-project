import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/navbar";

function UploadMusic() {
    const [title, setTitle] = useState("");
    const [music, setMusic] = useState(null);

    async function handleUpload(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("music", music);

        try {
            const response = await api.post(
                "/api/music/upload",
                formData
            );

            console.log("UPLOAD RESPONSE:", response.data);

            alert("Music uploaded successfully");
        } catch (error) {
            console.log("Upload Error:", error);
        }
    }

    return (
        <>
            <Navbar />

            <div>
                <h1>Upload Music</h1>

                <form onSubmit={handleUpload}>
                    <input
                        type="text"
                        placeholder="Enter Music Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setMusic(e.target.files[0])}
                    />

                    <br /><br />

                    <button type="submit">
                        Upload Music
                    </button>
                </form>
            </div>
        </>
    );
}

export default UploadMusic;