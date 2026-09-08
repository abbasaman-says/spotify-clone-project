import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/navbar";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await api.post("/api/auth/register", {
                username,
                email,
                password
            });

            console.log("REGISTER RESPONSE:", response.data);

            navigate("/login");

        } catch (error) {
            console.log("Register Error:", error);
        }
    }

    return (
        <>
            <Navbar />

            <div>
                <h1>Register</h1>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <br />

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
                        Register
                    </button>

                </form>
            </div>
        </>
    );
}

export default Register;