import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import RostersTable from '../components/RostersTable.jsx';
import { FaUsers } from 'react-icons/fa';

const STORAGE_KEY = 'cachedRosters';
const SELECTED_ROSTER_KEY = 'selectedRosterId';

export default function Rosters() {
  const { token } = useAuth();

  const [rosters, setRosters] = useState(() => {
    // Intenta cargar del sessionStorage al inicio
    const cached = sessionStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  });
  const [selectedRosterId, setSelectedRosterId] = useState(() => {
    // También cargar la selección guardada si hay
    return sessionStorage.getItem(SELECTED_ROSTER_KEY) || '';
  });
  const [loading, setLoading] = useState(rosters.length === 0);
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
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && rosters.length === 0) {
      fetchRosters();
    }
  }, [token]);

  const handleRosterChange = (e) => {
    const id = e.target.value;
    setSelectedRosterId(id);
    sessionStorage.setItem(SELECTED_ROSTER_KEY, id);
  };

  const selectedRoster = rosters.find(r => r.id === parseInt(selectedRosterId));

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
            onChange={handleRosterChange}
            value={selectedRosterId}
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

        {/* Tabla de player types */}
        {selectedRoster && (
          <RostersTable playerTypes={selectedRoster.player_types} />
        )}
      </div>
    </>
  );
}
