import { NavLink } from "react-router-dom";
import { HOME, BOOKMARKS } from "../utils/routes";

const Navigation = () => {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#000",
  };

  const defaultStyle = {
    textDecoration: "none",
    color: "#555",
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", marginBottom: "2rem", display: "flex", gap: "1rem" }}>
      <NavLink
        to={HOME}
        style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
        end
      >
        Home
      </NavLink>
      <NavLink
        to={BOOKMARKS}
        style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
      >
        Bookmarks
      </NavLink>
    </nav>
  );
};

export default Navigation;
