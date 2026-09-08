import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/navbar";

function Albums() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        getAlbums();
    }, []);

    async function getAlbums() {
        try {
            const response = await api.get("/api/music/albums");

            console.log("Albums:", response.data);

            setAlbums(response.data.albums);
        } catch (error) {
            console.log("Error fetching albums:", error);
        }
    }

    return (
        <>
            <Navbar />

            <div className="albums-page">
                <h1>Albums</h1>

                <div className="music-grid">
                    {albums.map((album) => (
                        <Link
                            to={`/album/${album._id}`}
                            key={album._id}
                            className="album-link"
                        >
                            <div className="music-card">
                                <div className="music-image">💿</div>

                                <h3>{album.title}</h3>

                                <p>{album.artist?.username}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Albums;