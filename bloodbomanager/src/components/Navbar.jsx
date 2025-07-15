import { NavLink } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  const hasRole = (roleName) => {
    return user?.roles?.some(role => role.name === roleName);
  };

  return (
    <nav className="navbar">
      <div className="nav-links-wrapper">
        <ul className="nav-links">
          <li><NavLink to="/" end>Dashboard</NavLink></li>
          {hasRole('admin') && (
            <li><NavLink to="/coaches">Coaches</NavLink></li>
          )}
        </ul>
      </div>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
