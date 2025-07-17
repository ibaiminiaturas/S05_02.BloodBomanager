import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';

export default function TeamCreateModal({ onClose, onCreate }) {
  const { token } = useAuth();

  const [name, setName] = useState('');
  const [coachId, setCoachId] = useState('');
  const [rosterId, setRosterId] = useState('');
  const [goldRemaining, setGoldRemaining] = useState('');
  const [teamValue, setTeamValue] = useState('');

  const [coaches, setCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(false);
  const [errorCoaches, setErrorCoaches] = useState('');

  const [rosters, setRosters] = useState([]);
  const [loadingRosters, setLoadingRosters] = useState(false);
  const [errorRosters, setErrorRosters] = useState('');

  useEffect(() => {
    if (!token) return;
setGoldRemaining(1000000);
    const fetchCoaches = async () => {
      setLoadingCoaches(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/coaches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Error al cargar entrenadores');
        const data = await res.json();
        setCoaches(data.data.data || []); // Ajusta si tu API es distinta
        setErrorCoaches('');
      } catch (err) {
        setErrorCoaches(err.message);
      } finally {
        setLoadingCoaches(false);
      }
    };

    const fetchRosters = async () => {
      setLoadingRosters(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/rosters`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Error al cargar rosters');
        const data = await res.json();
        setRosters(data.data || []);
        setErrorRosters('');
      } catch (err) {
        setErrorRosters(err.message);
      } finally {
        setLoadingRosters(false);
      }
    };

    fetchCoaches();
    fetchRosters();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      name,
      coach_id: coachId,
      roster_id: rosterId,
      gold_remaining: goldRemaining,
      team_value: teamValue,
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full pointer-events-auto"
      >
        <h3 className="text-xl font-semibold mb-4">Crear nuevo equipo</h3>

        <label className="block mb-3">
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="block mb-3">
          Entrenador:
          {loadingCoaches ? (
            <p className="text-gray-500 mt-1">Cargando entrenadores...</p>
          ) : errorCoaches ? (
            <p className="text-red-600 mt-1">{errorCoaches}</p>
          ) : (
            <select
              value={coachId}
              onChange={(e) => setCoachId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona un entrenador</option>
              {coaches.map((coach) => (
                <option key={coach.id} value={coach.id}>
                  {coach.name}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="block mb-3">
          Roster:
          {loadingRosters ? (
            <p className="text-gray-500 mt-1">Cargando rosters...</p>
          ) : errorRosters ? (
            <p className="text-red-600 mt-1">{errorRosters}</p>
          ) : (
            <select
              value={rosterId}
              onChange={(e) => setRosterId(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecciona un roster</option>
              {rosters.map((roster) => (
                <option key={roster.id} value={roster.id}>
                  {roster.name}
                </option>
              ))}
            </select>
          )}
        </label>

        <label className="block mb-3">
          Oro restante:
          <input
            type="number"
            value={goldRemaining}
            onChange={(e) => setGoldRemaining(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            required
          />
        </label>

        <label className="block mb-5">
          Valor del equipo:
          <input
            type="number"
            value={teamValue}
            onChange={(e) => setTeamValue(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            required
          />
        </label>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={
              !name || !coachId || !rosterId || !goldRemaining || !teamValue
            }
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}
