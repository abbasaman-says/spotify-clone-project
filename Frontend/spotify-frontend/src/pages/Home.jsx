import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/navbar";
import MusicCard from "../components/musiccard";
import Player from "../components/player";

function Home() {
    const [musics, setMusics] = useState([]);
    const [currentMusic, setCurrentMusic] = useState(null);

    useEffect(() => {
        getMusics();
    }, []);

    async function getMusics() {
        try {
            const response = await api.get("/api/music");

            console.log("Musics:", response.data);

            setMusics(response.data.musics);
        } catch (error) {
            console.log("Error fetching music:", error);
        }
    }

    return (
        <>
            <Navbar />

            <div className="home-page">
                <h1>All Music</h1>

                <div className="music-grid">
                    {musics?.map((music) => (
                        <MusicCard
                            key={music._id}
                            music={music}
                            onPlay={setCurrentMusic}
                        />
                    ))}
                </div>

                <Player music={currentMusic} />
            </div>
        </>
    );
}

export default Home;