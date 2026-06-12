import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>🎮 GamerStore</h2>

      <div className="nav-links">

        <Link to="/">
          Inicio
        </Link>

        <Link to="/nuevo">
          Nuevo Juego
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;