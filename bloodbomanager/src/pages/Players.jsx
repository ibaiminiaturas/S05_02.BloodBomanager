import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import PlayersTable from '../components/PlayersTable.jsx';

export default function Players() {
  const { token } = useAuth();

  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

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

    fetchTeams();
  }, [token]);

  useEffect(() => {
    if (!token || !selectedTeamId) {
      setPlayers([]);
      return;
    }

    const fetchPlayersByTeam = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${selectedTeamId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Error al obtener los jugadores');
        const data = await res.json();
        if (data?.data?.team_players && Array.isArray(data.data.team_players)) {
          setPlayers(data.data.team_players);
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

    fetchPlayersByTeam();
  }, [token, selectedTeamId]);

  return (
    <>
      <h2 className="text-3xl font-bold mb-4 ml-4">Listado de Equipos</h2>

      <div className="max-w-md mb-6 ml-4">
        <select
          value={selectedTeamId}
          onChange={e => setSelectedTeamId(e.target.value)}
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

      {selectedTeamId && !loading && !error && (
        <PlayersTable
          players={players}
          onEdit={(player) => {
            console.log('Editar jugador:', player);
          }}
          onDelete={(player) => {
            console.log('Eliminar jugador:', player);
          }}
        />
      )}
    </>
  );
}
