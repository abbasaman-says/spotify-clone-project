import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import UploadMusic from "./pages/UploadMusic";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateAlbum from "./pages/CreateAlbum";
import ArtistOnlyRoute from "./components/ArtistOnlyRoute";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/albums"
        element={
          <ProtectedRoute>
            <Albums />
          </ProtectedRoute>
        }
      />

      <Route
        path="/album/:id"
        element={
          <ProtectedRoute>
            <AlbumDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadMusic />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-album"
        element={
          <ArtistOnlyRoute>
            <CreateAlbum />
          </ArtistOnlyRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;