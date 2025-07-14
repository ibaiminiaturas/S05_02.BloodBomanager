import React from 'react';
import { useAuth } from '../utils/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <p>Bienvenido, {user.name}!</p>
      ) : (
        <p>Cargando usuario...</p>
      )}
    </div>
  );
}