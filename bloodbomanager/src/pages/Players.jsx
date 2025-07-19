import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import PlayersTable from '../components/PlayersTable.jsx';
import PlayerEditModal from '../components/PlayerEditModal.jsx';
import usePlayers from '../hooks/usePlayers.jsx';

export default function Players() {
  const { token } = useAuth();

  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null); // Guardamos equipo completo con jugadores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pasamos selectedTeam y setSelectedTeam al hook para gestión centralizada
  const {
    playerToEdit,
    isPlayerEditOpen,
    handleEditPlayer,
    handleClosePlayerEdit,
    handleSavePlayer,
    handleDeletePlayer,
  } = usePlayers(selectedTeam, setSelectedTeam);

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
      setSelectedTeam(null);
      return;
    }

    const fetchTeamWithPlayers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${selectedTeamId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Error al obtener el equipo y jugadores');
        const data = await res.json();

        if (data?.data && data.data.team_players && Array.isArray(data.data.team_players)) {
          setSelectedTeam(data.data);
          setError('');
        } else {
          setSelectedTeam(null);
          setError('Respuesta inesperada de la API para equipo y jugadores');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamWithPlayers();
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

      {selectedTeam && !loading && !error && (
        <PlayersTable
          players={selectedTeam.team_players}
          onEdit={handleEditPlayer}
          onDelete={handleDeletePlayer}
          showActions={true}
        />
      )}

      {isPlayerEditOpen && playerToEdit && (
        <PlayerEditModal
          isOpen={isPlayerEditOpen}
          player={playerToEdit}
          onClose={handleClosePlayerEdit}
          onSave={handleSavePlayer}
        />
      )}
    </>
  );
}
