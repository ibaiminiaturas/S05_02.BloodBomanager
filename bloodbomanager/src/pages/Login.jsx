// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import MySwal from '../utils/MySwal.js';
import LoginForm from '../components/LoginForm.jsx';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        const token = data.access_token;
        if (token) {
          MySwal.fire({
            icon: 'success',
            title: '¡Login exitoso!',
            timer: 2000,
            showConfirmButton: false,
            position: 'top',
          });
          await login(token);
          navigate('/');
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se recibió token del servidor',
            position: 'top',
          });
        }
      } else {
        MySwal.fire({
          icon: 'error',
          title: 'Error de login',
          text: data.message || 'Credenciales incorrectas',
          position: 'top',
        });
      }
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor',
        position: 'top',
      });
    }
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}
