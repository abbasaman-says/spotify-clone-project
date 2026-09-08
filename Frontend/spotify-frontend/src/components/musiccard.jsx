function MusicCard({ music, onPlay }) {
    return (
        <div className="music-card">

            <div className="music-image">
                🎵
            </div>

            <h3>{music.title}</h3>

            <p>{music.artist?.username}</p>

            <p>{music.album?.title || "No Album"}</p>

            <button onClick={() => onPlay(music)}>
                ▶ Play
            </button>

        </div>
    );
}

export default MusicCard;