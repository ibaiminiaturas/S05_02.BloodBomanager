import React, { useEffect, useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import PlayersTable from '../components/PlayersTable.jsx';
import PlayerEditModal from '../components/PlayerEditModal.jsx';
import PlayerFormModal from '../components/PlayerFormModal';

export default function Players() {
  const { token } = useAuth();

  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [rosters, setRosters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [isPlayerEditOpen, setIsPlayerEditOpen] = useState(false);

  const [isAddPlayerOpen, setIsAddPlayerOpen] = useState(false);

  // Cargar equipos
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

  // Cargar rosters
  useEffect(() => {
    if (!token) return;

    const fetchRosters = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/rosters`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Error al obtener los rosters');
        const data = await res.json();

        if (data?.data && Array.isArray(data.data)) {
          setRosters(data.data);
          setError('');
        } else {
          setRosters([]);
          setError('Respuesta inesperada de la API para rosters');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRosters();
  }, [token]);

  // Cargar equipo seleccionado con jugadores
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

  // Player types para el roster del equipo seleccionado
  const playerTypesForSelectedTeam = useMemo(() => {
    if (!selectedTeam || !rosters.length) return [];
    const roster = rosters.find(r => r.id === selectedTeam.roster_id);
    return roster?.player_types || [];
  }, [selectedTeam, rosters]);

  // Abrir modal editar jugador
  const handleEditPlayer = (player) => {
    setPlayerToEdit(player);
    setIsPlayerEditOpen(true);
  };

  const handleClosePlayerEdit = () => {
    setPlayerToEdit(null);
    setIsPlayerEditOpen(false);
  };

  // Guardar jugador (editar o crear)

// Guardar jugador (editar o crear)
const handleSavePlayer = async (playerData) => {
  const method = playerToEdit ? 'PUT' : 'POST';
  const url = playerToEdit
    ? `${import.meta.env.VITE_API_BASE_URL}/api/players/${playerToEdit.id}`
    : `${import.meta.env.VITE_API_BASE_URL}/api/teams/${selectedTeam.id}/players`;

  try {
    const { isConfirmed } = await Swal.fire({
      title: '¿Confirmas guardar los cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(playerData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Error al guardar el jugador');
    }

    // 💡 VOLVER A FETCHEAR EL EQUIPO
    const refreshed = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${selectedTeam.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!refreshed.ok) throw new Error('Error al recargar el equipo');

    const teamData = await refreshed.json();
    setSelectedTeam(teamData.data);

    Swal.fire({
      title: playerToEdit ? 'Jugador guardado' : 'Jugador creado',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });

    handleClosePlayerEdit();
    setIsAddPlayerOpen(false);
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
    });
  }
};


  // Eliminar jugador
  const handleDeletePlayer = async (playerId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/players/${playerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al eliminar el jugador');
      }

      setSelectedTeam(prev => {
        if (!prev) return prev;
        const filteredPlayers = prev.team_players.filter(p => p.id !== playerId);
        return { ...prev, team_players: filteredPlayers };
      });

      Swal.fire({
        title: 'Jugador eliminado',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      });
    }
  };

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
        <>
        
          <PlayersTable
            players={selectedTeam.team_players}
            onEdit={handleEditPlayer}
            onDelete={handleDeletePlayer}
            showActions={true}
          />

          <div className="flex justify-center max-w-4xl mx-auto mt-6">
            <button
              onClick={() => setIsAddPlayerOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow"
            >
              + Añadir jugador
            </button>
          </div>
        </>
      )}

      {isPlayerEditOpen && playerToEdit && (
        <PlayerEditModal
          isOpen={isPlayerEditOpen}
          player={playerToEdit}
          onClose={handleClosePlayerEdit}
          onSave={handleSavePlayer}
          playerTypes={playerTypesForSelectedTeam}
        />
      )}

{isAddPlayerOpen && (
  <PlayerFormModal
    isOpen={isAddPlayerOpen}
    onClose={() => setIsAddPlayerOpen(false)}
    onSubmit={async (newPlayerData) => {
      try {
        const { isConfirmed } = await Swal.fire({
          title: '¿Confirmas añadir este jugador?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, añadir',
          cancelButtonText: 'Cancelar',
        });
        if (!isConfirmed) return;

        newPlayerData.team_id = selectedTeamId;
        const teamId = selectedTeam?.id;
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${teamId}/players`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newPlayerData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Error al añadir jugador');
        }

        // En vez de añadir directamente al array, recargamos el equipo entero:
        const refreshed = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${teamId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!refreshed.ok) throw new Error('Error al recargar el equipo');

        const teamData = await refreshed.json();
        setSelectedTeam(teamData.data);

        Swal.fire({
          title: 'Jugador añadido',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        setIsAddPlayerOpen(false);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      }
    }}
    playerTypes={playerTypesForSelectedTeam}
  />
)}

    </>
  );
}
