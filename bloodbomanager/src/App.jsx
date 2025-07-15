import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

// Importa aquí tus componentes de página
import Dashboard from './pages/Dashboard';
import Coaches from './pages/Coaches';
import Login from './pages/Login';

import { useAuth } from './utils/AuthContext';

import Register from './pages/Register';  // importa el componente Register

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

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
        {user.roles.some(r => r.name === 'admin') && (
          <Route path="/coaches" element={<Coaches />} />
        )}
      </Routes>
    </AppLayout>
  );
}
