import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { FaRunning } from 'react-icons/fa';
import PlayerTable from '../components/PlayerTable';
import Pagination from '../components/Pagination.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import MySwal from '../utils/MySwal.js';

export default function Players() {
  const { token } = useAuth();

  const [players, setPlayers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPlayers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/players?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al obtener los jugadores');

      const data = await res.json();
      setPlayers(data.data.data);
      setPagination(data.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchPlayers();
  }, [token]);

  const handleEditPlayer = (player) => {
    MySwal.fire({
      icon: 'info',
      title: 'Funcionalidad pendiente',
      text: `Editar jugador: ${player.name}`,
    });
  };

  const handleDeletePlayer = async (player) => {
    const confirm = await MySwal.fire({
      icon: 'warning',
      title: `¿Eliminar a ${player.name}?`,
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/players/${player.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Error al eliminar jugador');

        setPlayers(players.filter(p => p.id !== player.id));

        MySwal.fire({
          icon: 'success',
          title: 'Jugador eliminado',
          text: `${player.name} ha sido eliminado correctamente.`,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        MySwal.fire('Error', err.message, 'error');
      }
    }
  };

  const handlePageChange = (newPage) => fetchPlayers(newPage);

  return (
    <>
      {/* Título */}
      <div className="flex items-center mb-6 space-x-3 ml-4">
        <FaRunning className="text-green-700 w-10 h-10" />
        <h2 className="text-3xl font-extrabold text-gray-900">Listado de Jugadores</h2>
      </div>

      <div className={`relative max-w-full ${loading ? 'pointer-events-none blur-[0.5px]' : ''}`}>
        {loading && <LoadingOverlay fullScreen={false} message="Cargando jugadores..." />}

        <PlayerTable
          players={players}
          onEditPlayer={handleEditPlayer}
          onDeletePlayer={handleDeletePlayer}
        />

        {pagination && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>
    </>
  );
}
