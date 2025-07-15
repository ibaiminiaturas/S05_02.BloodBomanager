// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext.jsx';
import HoverDropdownMenu from './HoverDropdownMenu.jsx';


const Navbar = () => {
  const { user, logout } = useAuth();

  const hasRole = (roleName) => {
    return user?.roles?.some(role => role.name === roleName);
  };

  return (
    <nav className="navbar">
      <Link to="/">Dashboard</Link>

      {hasRole('admin') && (
        <>
          {' | '}
          <Link to="/coaches">Coaches</Link>


        </>
      )}

      {' | '}
      <button onClick={logout} style={{ cursor: 'pointer' }}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
