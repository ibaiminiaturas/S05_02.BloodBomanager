import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LoadingOverlay from './components/LoadingOverlay.jsx';

// Importa aquí tus componentes de página
import Dashboard from './pages/Dashboard';
import Coaches from './pages/Coaches';
import Login from './pages/Login';
import Skills from './pages/Skills.jsx'; // ← importa el componente
import Rosters from './pages/Rosters.jsx'; // ← importa el componente


import { useAuth } from './utils/AuthContext';

import Register from './pages/Register';  // importa el componente Register

export default function App() {
  const { user, loading } = useAuth();

  {/* Contenedor relativo y ancho completo para tabla + paginación */ }
  <div className={`relative max-w-full ${loading ? 'pointer-events-none blur-[0.5px]' : ''}`}>
    {/* Overlay loading solo sobre este contenedor */}
    {loading && <LoadingOverlay fullScreen={false} message="Cargando..." />}
  </div>

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Redirigir a /login para cualquier otra ruta */}
        <Route path="*" element={<Login />} />

      </Routes>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/rosters" element={<Rosters />} />
        {user.roles.some(r => r.name === 'admin') && (
          <Route path="/coaches" element={<Coaches />} />
        )}

      </Routes>
    </AppLayout>
  );
}
