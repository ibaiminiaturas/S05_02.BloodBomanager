import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';

import Dashboard from './pages/Dashboard';
import Coaches from './pages/Coaches';
import Login from './pages/Login';
import Register from './pages/Register'; // ✅ Import obligatorio

import { useAuth } from './utils/AuthContext';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return (
    <Routes>

      {/* Rutas públicas */}
      {!user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* ✅ Sigue la ruta */}
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}

      {/* Rutas protegidas */}
      {user && (
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          {user.roles.some(r => r.name === 'admin') && (
            <Route path="/coaches" element={<Coaches />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}

    </Routes>

  );
}
