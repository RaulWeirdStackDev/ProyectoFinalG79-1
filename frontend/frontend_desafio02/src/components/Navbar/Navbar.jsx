import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import './Navbar.css';

import logoDrixel from '../../assets/images/LOGODRIXEL2025.png';
import useroff from '../../assets/images/USERBLACK.png';
import useron from '../../assets/images/USERGREEN.png';

const Navbar = () => {
  const { total } = useContext(CartContext);
  const { token, logout, userData } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid navbar-flex-container">
        <div className="navbar-left"></div>
        <div className="navbar-center">
          <Link to="/" className="navbar-home-logo">
            <img src={logoDrixel} alt="Drixel Store Logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Botones a la derecha */}
        <div className="navbar-right-buttons">
          {token ? (
            <>
              <Link to="/profile" className="icon-button">
                <img src={useron} alt="Usuario activo" className="icon-img" />
              </Link>
              {userData?.nombre && (
                <span className="navbar-username mx-2">
                  {userData.nombre}
                </span>
              )}
              <button onClick={logout} className="icon-button btn btn-link">
                📴
              </button>
            </>
          ) : (
            <Link to="/useroptions" className="icon-button">
              <img src={useroff} alt="Usuario apagado" className="icon-img" />
            </Link>
          )}
          <Link to="/cart" className="total-button nav-link">
            🛒 ${total.toLocaleString()}&nbsp;
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
