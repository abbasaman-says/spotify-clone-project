import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">

            <h2>Spotify</h2>

            <div className="sidebar-links">

                <Link to="/">
                    <p>🏠 Home</p>
                </Link>

                <Link to="/albums">
                    <p>💿 Albums</p>
                </Link>

            </div>

        </div>
    );
}

export default Sidebar;