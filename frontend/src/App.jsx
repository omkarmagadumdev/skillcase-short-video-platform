import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Bookmarks from "./pages/Bookmarks";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import { HOME, LOGIN, REGISTER, NOT_FOUND, BOOKMARKS } from "./utils/routes";

const App = () => {
  return (
    <Routes>
      <Route
        path={HOME}
        element={
          <ProtectedRoute>
            <Navigation />
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path={BOOKMARKS}
        element={
          <ProtectedRoute>
            <Navigation />
            <Bookmarks />
          </ProtectedRoute>
        }
      />
      <Route path={LOGIN} element={<Login />} />
      <Route path={REGISTER} element={<Register />} />
      <Route path={NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default App;
