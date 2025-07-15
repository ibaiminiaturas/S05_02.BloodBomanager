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
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          {hasRole('admin') && (
            <li><NavLink to="/coaches" className={({ isActive }) => isActive ? 'active' : ''}>Coaches</NavLink></li>
          )}
        </ul>
      </div>
      <div className="full-width-black-line"></div>
      <div className="logout-wrapper">
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
