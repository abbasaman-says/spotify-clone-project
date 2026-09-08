import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { isLoggedIn, setIsLoggedIn, user, setUser } =
        useContext(AuthContext);

    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await api.post("/api/auth/logout");

            setIsLoggedIn(false);
            setUser(null);

            navigate("/login");
        } catch (error) {
            console.log("Logout Error:", error);
        }
    }

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                <span>Music</span> App 🎵
            </Link>

            <div className="nav-links">

                {isLoggedIn ? (
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/albums">Albums</Link>

                        {user?.role === "artist" && (
                            <>
                                <Link to="/upload">Upload Music</Link>
                                <Link to="/create-album">Create Album</Link>
                            </>
                        )}

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;