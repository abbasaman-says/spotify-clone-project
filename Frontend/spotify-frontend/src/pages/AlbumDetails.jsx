import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/navbar";

import MusicCard from "../components/musiccard";
import Player from "../components/player";

function AlbumDetails() {

    const { id } = useParams();

    const [album, setAlbum] = useState(null);
    const [currentMusic, setCurrentMusic] = useState(null);

    useEffect(() => {
        getAlbumDetails();
    }, [id]);

    async function getAlbumDetails() {

        try {

            const response = await api.get(
                `/api/music/albums/${id}`
            );

            console.log("Album Details:", response.data);

            setAlbum(response.data.album);

        } catch (error) {

            console.log("Error fetching album:", error);

        }
    }

    if (!album) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Navbar />

            <div className="album-details-page">
                <h1>{album.title}</h1>

                <p>Artist: {album.artist?.username}</p>

                <h2>Songs</h2>

                <div className="music-grid">
                    {album.musics?.map((music) => (
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

export default AlbumDetails;