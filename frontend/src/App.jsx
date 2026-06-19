import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { HOME, LOGIN, REGISTER, NOT_FOUND } from "./utils/routes";

const App = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={LOGIN} element={<Login />} />
      <Route path={REGISTER} element={<Register />} />
      <Route path={NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};

export default App;
