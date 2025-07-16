// src/pages/Rosters.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { FaUsers } from 'react-icons/fa';

export default function Rosters() {
  const { token } = useAuth();

  const [rosters, setRosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRosters = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/rosters`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al obtener los rosters');

      const data = await res.json();
      setRosters(data.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchRosters();
  }, [token]);

  return (
    <>
      {/* Título */}
      <div className="flex items-center mb-6 space-x-3 ml-4">
        <FaUsers className="text-blue-500 w-10 h-10" />
        <h2 className="text-3xl font-extrabold text-gray-900">Listado de Rosters</h2>
      </div>

      {/* Contenedor con loading/error + desplegable */}
      <div className={`relative max-w-full ${loading ? 'pointer-events-none blur-[0.5px]' : ''}`}>
        {loading && <LoadingOverlay fullScreen={false} message="Cargando rosters..." />}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md max-w-4xl mx-auto mb-4">
            {error}
          </div>
        )}

       <div className="max-w-md mb-6 ml-4">
            <select
                id="rosterSelect"
                className="w-full px-4 py-2 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            >
                <option value="">-- Elige un roster --</option>
                {rosters.map((roster) => (
                <option key={roster.id} value={roster.id}>
                    {roster.name}
                </option>
                ))}
            </select>
        </div>
      </div>
    </>
  );
}
