function Player({ music }) {

    if (!music) {
        return (
            <div className="player">
                <p>Select a song to play 🎵</p>
            </div>
        );
    }

    return (
        <div className="player">

            <div>
                <h4>{music.title}</h4>
                <p>{music.artist?.username}</p>
            </div>

            <audio
                controls
                autoPlay
                src={music.uri}
            >
            </audio>

        </div>
    );
}

export default Player;