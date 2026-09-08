import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/navbar";

function CreateAlbum() {
    const [title, setTitle] = useState("");
    const [musics, setMusics] = useState([]);
    const [selectedMusics, setSelectedMusics] = useState([]);

    useEffect(() => {
        getMusics();
    }, []);

    async function getMusics() {
        try {
            const response = await api.get("/api/music");

            console.log("MUSIC FOR ALBUM:", response.data);

            setMusics(response.data.musics);
        } catch (error) {
            console.log("Music Error:", error);
        }
    }

    function handleMusicSelect(musicId) {
        if (selectedMusics.includes(musicId)) {
            setSelectedMusics(
                selectedMusics.filter((id) => id !== musicId)
            );
        } else {
            setSelectedMusics([
                ...selectedMusics,
                musicId
            ]);
        }
    }

    async function handleCreateAlbum(e) {
        e.preventDefault();

        try {
            const response = await api.post(
                "/api/music/album",
                {
                    title,
                    musics: selectedMusics
                }
            );

            console.log("ALBUM RESPONSE:", response.data);

            alert("Album created successfully");

            setTitle("");
            setSelectedMusics([]);

        } catch (error) {
            console.log("Album Error:", error);
            console.log(
                "SERVER RESPONSE:",
                error.response?.data
            );
        }
    }

    return (
        <>
            <Navbar />

            <div>
                <h1>Create Album</h1>

                <form onSubmit={handleCreateAlbum}>

                    <input
                        type="text"
                        placeholder="Enter Album Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <h3>Select Songs</h3>

                    {musics.map((music) => (
                        <div key={music._id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedMusics.includes(
                                        music._id
                                    )}
                                    onChange={() =>
                                        handleMusicSelect(
                                            music._id
                                        )
                                    }
                                />

                                {music.title}
                            </label>
                        </div>
                    ))}

                    <br />

                    <button type="submit">
                        Create Album
                    </button>

                </form>
            </div>
        </>
    );
}

export default CreateAlbum;