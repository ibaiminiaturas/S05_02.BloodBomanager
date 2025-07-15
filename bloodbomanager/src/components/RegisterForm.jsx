// src/components/RegisterForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterForm({
  formData,
  handleChange,
  handleSubmit,
  errors
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro</h2>

        {errors && (
          <div className="mb-4">
            {Object.entries(errors).map(([field, msg]) => (
              <p key={field} className="text-red-500 text-sm">{msg}</p>
            ))}
          </div>
        )}

        <div className="mb-4">
          <input
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <input
            name="password_confirmation"
            type="password"
            placeholder="Confirmar contraseña"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrarse
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
