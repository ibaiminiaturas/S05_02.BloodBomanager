// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const hasRole = (roleName) => {
    return user?.roles?.some(role => role.name === roleName);
  };

  const navItems = [
    { to: '/', label: 'Dashboard', roles: [] },
    { to: '/coaches', label: 'Coaches', roles: ['admin'] },
    { to: '/teams', label: 'Equipos', roles: ['admin'] },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 relative">
      <div className="w-full flex items-center justify-between px-6 h-16 relative">
        {/* Texto a la izquierda */}
        <div className="text-2xl font-extrabold text-gray-800 whitespace-nowrap">
          Bloodbowl Manager
        </div>

        {/* Pestañas centradas absoluta */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4" style={{ bottom: 0 }}>
          {navItems.map(({ to, label, roles }) => {
            if (roles.length && !roles.some(r => hasRole(r))) return null;
            const isActive = location.pathname === to;

            return (
              <Link
                key={to}
                to={to}
                className={`w-28 rounded-t-md shadow-md text-sm transition font-medium flex items-center justify-center h-12
                  ${isActive
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Botón logout a la derecha */}
        <div className="flex items-center">
          <button
            onClick={logout}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
