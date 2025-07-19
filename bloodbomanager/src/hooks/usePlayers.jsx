import { useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';

export default function usePlayers(players, setPlayers) {
  const { token } = useAuth();

  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [isPlayerEditOpen, setIsPlayerEditOpen] = useState(false);

  const handleEditPlayer = (player) => {
    setPlayerToEdit(player);
    setIsPlayerEditOpen(true);
  };

  const handleClosePlayerEdit = () => {
    setPlayerToEdit(null);
    setIsPlayerEditOpen(false);
  };

  const handleSavePlayer = async (playerData) => {
    try {
      const method = playerToEdit ? 'PUT' : 'POST';
      const url = playerToEdit
        ? `${import.meta.env.VITE_API_BASE_URL}/api/players/${playerToEdit.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/api/players`;

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

     const data = await res.json();

    const updatedPlayer = data.player;

    // Actualizar solo el jugador dentro del array players
    setPlayers(prevPlayers => {
      if (!Array.isArray(prevPlayers)) return [updatedPlayer];
      return prevPlayers.map(p => (p.id === updatedPlayer.id ? { ...p, ...updatedPlayer } : p));
    });


     

      handleClosePlayerEdit();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este jugador?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/players/${playerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al eliminar el jugador');
      }

      setPlayers(players.filter(p => p.id !== playerId));
    } catch (error) {
      alert(error.message);
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
