// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext.jsx';
import AnimatedTitle from './AnimatedTitle.jsx';

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
    { to: '/rosters', label: 'Rosters', roles: ['admin', 'coach'] },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg border-b border-gray-200 z-50 h-16 flex items-center px-6">
      <div className="flex-shrink-0 max-w-xs">
        <AnimatedTitle text="Bloodbowl Manager" />
      </div>


<div className="flex-1 flex justify-center items-end space-x-4 h-full">
  {navItems.map(({ to, label, roles }) => {
    if (roles.length && !roles.some(r => hasRole(r))) return null;
    const isActive = location.pathname === to;

    return (
      <Link
  key={to}
  to={to}
  className={`rounded-t-md shadow-md text-sm transition-transform duration-200 origin-bottom font-medium flex items-center justify-center px-4
    ${isActive
      ? 'bg-blue-700 text-white h-12 scale-105'
      : 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105 h-12'
    }`}
  style={{ minWidth: '100px' }}
>
  {label}
</Link>
    );
  })}
</div>





      <div className="flex-shrink-0">
        <button
          onClick={logout}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
