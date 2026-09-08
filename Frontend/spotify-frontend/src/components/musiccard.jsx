function MusicCard({ music, onPlay }) {
    return (
        <div className="music-card">

            <div className="music-image">
                🎵
            </div>

            <h3>{music.title}</h3>

            <p>{music.artist?.username}</p>

            <button onClick={() => onPlay(music)}>
                ▶ Play
            </button>

        </div>
    );
}

export default MusicCard;