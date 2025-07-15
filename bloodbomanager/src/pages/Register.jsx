// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import MySwal from '../utils/MySwal.js';
import RegisterForm from '../components/RegisterForm.jsx';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        MySwal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: data.message || 'Credenciales incorrectas',
          position: 'top',
        });
        return;
      }

      login(data.access_token, data.user);
      MySwal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        timer: 2000,
        showConfirmButton: false,
        position: 'top',
      });
      navigate("/");

    } catch (err) {
      MySwal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor',
        position: 'top',
      });
    }
  };

  return (
    <RegisterForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
}
