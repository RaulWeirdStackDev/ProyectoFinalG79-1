import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext'; 
import './Navbar.css';

const Navbar = () => {
  const { total } = useContext(CartContext); // Traigo el total desde CartContext.
  const { token, logout } = useContext(UserContext); // Obtengo el token y el método logout desde UserContext.

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-title d-none d-lg-block">Pizzería Mamma Mía!</span>
        <button
          className="navbar-toggler mb-2 mt-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">🍕 Home</Link>
            </li>
            {token ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">⚙️ Profile</Link>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="nav-link btn btn-link">🔒 Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">🔐 Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">🔏 Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/cart" className="total-button nav-link">
          🛒 Total: ${total.toLocaleString()}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
