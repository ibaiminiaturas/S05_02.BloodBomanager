import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

// Importa aquí tus componentes de página
import Dashboard from './pages/Dashboard';
import Coaches from './pages/Coaches';
import Login from './pages/Login';

import { useAuth } from './utils/AuthContext';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  // Si no hay usuario, mostramos el login
  if (!user) {
    return <Login />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Solo admin puede acceder a /coaches */}
        {user.roles.some(r => r.name === 'admin') && (
          <Route path="/coaches" element={<Coaches />} />
        )}
        {/* Aquí puedes agregar más rutas */}
      </Routes>
    </AppLayout>
  );
}
