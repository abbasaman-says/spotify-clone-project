import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkLogin();
    }, []);

    async function checkLogin() {
        try {
            const response = await api.get("/api/auth/me");

            setUser(response.data.user);
            setIsLoggedIn(true);

        } catch (error) {
            setUser(null);
            setIsLoggedIn(false);

        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                loading,
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;