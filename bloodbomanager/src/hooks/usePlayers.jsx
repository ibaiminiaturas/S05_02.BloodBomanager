// src/hooks/usePlayers.js

import { useState } from 'react';
import MySwal from '../utils/MySwal.js';
import { useAuth } from '../utils/AuthContext.jsx';

export default function usePlayers(selectedTeam, setSelectedTeam) {
  const { token } = useAuth();
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [isPlayerEditOpen, setIsPlayerEditOpen] = useState(false);

  const handleEditPlayer = (player) => {
    setPlayerToEdit(player);
    setIsPlayerEditOpen(true);
  };

  const handleClosePlayerEdit = () => {
    setIsPlayerEditOpen(false);
    setPlayerToEdit(null);
  };

  const handleSavePlayer = async (updatedPlayer) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/players/${updatedPlayer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          injuries: updatedPlayer.injuries,
          spp: updatedPlayer.spp,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.errors) {
          const errorMessages = Object.values(data.errors).flat().join('\n');
          return MySwal.fire({
            icon: 'error',
            title: 'Error de validación',
            text: errorMessages,
          });
        }
        throw new Error(data.message || 'Error al actualizar el jugador');
      }

      const updatedData = data.player || data;

      if (selectedTeam && selectedTeam.team_players) {
        const updatedPlayers = selectedTeam.team_players.map(p =>
          p.id === updatedData.id ? { ...p, ...updatedData } : p
        );

        setSelectedTeam({
          ...selectedTeam,
          team_players: updatedPlayers,
        });
      }
      setPlayerToEdit(updatedData);
      handleClosePlayerEdit();

      await MySwal.fire({
        icon: 'success',
        title: 'Jugador actualizado',
        text: `El jugador "${updatedData.name}" se actualizó correctamente.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Error desconocido',
      });
    }
  };

  const handleDeletePlayer = async (player) => {
    try {
      const result = await MySwal.fire({
        title: `¿Eliminar a "${player.name}"?`,
        text: 'Esta acción no se puede deshacer. El jugador será eliminado permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (!result.isConfirmed) return;

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/players/${player.id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        const errText = data.message || 'Error al eliminar el jugador';
        throw new Error(errText);
      }

      if (selectedTeam && selectedTeam.team_players) {
        const updatedPlayers = selectedTeam.team_players.filter(p => p.id !== player.id);
        setSelectedTeam({ ...selectedTeam, team_players: updatedPlayers });
      }

      await MySwal.fire({
        icon: 'success',
        title: 'Jugador eliminado',
        text: 'El jugador se eliminó correctamente.',
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (err) {
      MySwal.fire({
        icon: 'error',
        title: 'Error al eliminar jugador',
        text: err.message || 'Ocurrió un error desconocido.',
      });
    }
  };

  return {
    playerToEdit,
    isPlayerEditOpen,
    handleEditPlayer,
    handleClosePlayerEdit,
    handleSavePlayer,
    handleDeletePlayer,
  };
}
