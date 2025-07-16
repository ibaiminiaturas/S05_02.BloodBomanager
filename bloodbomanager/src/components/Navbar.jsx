// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext.jsx';
import AnimatedTitle from '../components/AnimatedTitle.jsx';

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
    { to: '/skills', label: 'Habilidades', roles: ['admin', 'coach'] },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 relative">
      <div className="w-full flex items-center justify-between px-6 h-16 relative">
        {/* Contenedor título con ancho fijo o máximo para que no empuje */}
        <div className="flex-shrink-0 max-w-xs">
          <AnimatedTitle text="Bloodbowl Manager" />
        </div>

        {/* Pestañas centradas absolute: fuera del flujo flex */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 flex space-x-4">
          {navItems.map(({ to, label, roles }) => {
            if (roles.length && !roles.some(r => hasRole(r))) return null;
            const isActive = location.pathname === to;

            return (
              <Link
                key={to}
                to={to}
                className={`rounded-t-md shadow-md text-sm transition font-medium flex items-center justify-center h-12 text-center
    ${isActive
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                style={{ minWidth: '100px' }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Logout siempre a la derecha y que no se reduzca */}
        <div className="flex-shrink-0">
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
