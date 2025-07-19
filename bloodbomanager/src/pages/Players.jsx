import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import PlayersTable from '../components/PlayersTable.jsx'; // tabla que quieres mostrar en vez del modal

export default function Teams() {
  const { token } = useAuth();

  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [players, setPlayers] = useState([]); // estado para jugadores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Traer equipos
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al obtener los equipos');

      const data = await res.json();

      if (data?.data?.data && Array.isArray(data.data.data)) {
        setTeams(data.data.data);
        setError('');
      } else {
        setTeams([]);
        setError('Respuesta inesperada de la API');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Traer todos los jugadores (asumo que hay un endpoint /api/players)
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/players`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al obtener los jugadores');

      const data = await res.json();

      if (data?.data && Array.isArray(data.data)) {
        setPlayers(data.data);
        setError('');
      } else {
        setPlayers([]);
        setError('Respuesta inesperada de la API para jugadores');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTeams();
      fetchPlayers();
    }
  }, [token]);

  // Cuando cambia el select, solo guardamos el id seleccionado, no abrimos modal
  const handleTeamChange = (e) => {
    setSelectedTeamId(e.target.value);
  };

  // Filtramos jugadores que pertenezcan al equipo seleccionado
  const filteredPlayers = selectedTeamId
    ? players.filter(player => player.team?.id === parseInt(selectedTeamId))
    : [];

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 ml-4">Listado de Equipos</h2>

      <div className="max-w-md mb-6 ml-4">
        <select
          value={selectedTeamId}
          onChange={handleTeamChange}
          className="w-full px-4 py-2 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
        >
          <option value="">-- Elige un equipo --</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      {loading && <LoadingOverlay message="Cargando datos..." fullScreen={false} />}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md max-w-4xl mx-auto mb-4">
          {error}
        </div>
      )}

      {/* Renderizamos solo la tabla, sin modal */}
      {selectedTeamId && (
        <PlayersTable
          players={filteredPlayers}
          onEdit={(player) => {
            // Aquí pones lógica para editar si tienes
            console.log('Editar jugador:', player);
          }}
          onDelete={(player) => {
            // Aquí pones lógica para eliminar si tienes
            console.log('Eliminar jugador:', player);
          }}
        />
      )}
    </>
  );
}
