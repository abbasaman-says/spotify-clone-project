import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/navbar";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setIsLoggedIn, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/login", {
                email,
                password
            });

            console.log("LOGIN RESPONSE:", response.data);
            console.log("LOGIN SUCCESS");

            setUser(response.data.user);
            setIsLoggedIn(true);

            navigate("/");
        } catch (error) {
            console.log("Login Error:", error);
        }
    }

    return (
        <>
            <Navbar />

            <div>
                <h1>Login</h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <br />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />

                    <button type="submit">
                        Login
                    </button>

                </form>
            </div>
        </>
    );
}

export default Login;