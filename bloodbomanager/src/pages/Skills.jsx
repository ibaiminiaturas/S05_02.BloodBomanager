// src/pages/skills.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import SkillTable from '../components/SkillsTable.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { FaStar } from 'react-icons/fa';

export default function Skills() {
  const { token } = useAuth();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/skills`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al obtener las habilidades');

      const data = await res.json();
      setSkills(data.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchSkills();
  }, [token]);

  return (
    <>
      {/* Título */}
      <div className="flex items-center mb-6 space-x-3 ml-4">
        <FaStar className="text-yellow-500 w-10 h-10" />
        <h2 className="text-3xl font-extrabold text-gray-900">Listado de Habilidades</h2>
      </div>

      {/* Tabla + loading + error */}
      <div className={`relative max-w-full ${loading ? 'pointer-events-none blur-[0.5px]' : ''}`}>
        {loading && <LoadingOverlay fullScreen={false} message="Cargando habilidades..." />}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md max-w-4xl mx-auto mb-4">
            {error}
          </div>
        )}

        <SkillTable skills={skills} />
      </div>
    </>
  );
}
