import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import CoachTable from '../components/CoachTable';
import CoachDetailsModal from '../components/CoachDetailsModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import Pagination from '../components/Pagination.jsx';
import MySwal from '../utils/MySwal.js';
import { FaUserTie } from 'react-icons/fa';
import LoadingOverlay from '../components/LoadingOverlay.jsx';

export default function Coaches() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [coachToDelete, setCoachToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchCoaches = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/coaches?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al obtener los coaches');

      const data = await res.json();
      setCoaches(data.data.data);
      setPagination(data.data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCoaches();
  }, [token]);

  const fetchCoachDetails = async (coachId) => {
    setDetailsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/coaches/${coachId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Error al obtener detalles del coach');
      const data = await res.json();
      setSelectedCoach(data.data);
      setShowDetailsModal(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleViewDetails = (coach) => fetchCoachDetails(coach.id);

  const handleCloseDetails = () => {
    setSelectedCoach(null);
    setShowDetailsModal(false);
  };

  const handleRequestDelete = (coach) => {
    setCoachToDelete(coach);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setCoachToDelete(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/coaches/${coachToDelete.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Error al eliminar el coach');

      setCoaches(coaches.filter(c => c.id !== coachToDelete.id));
      setShowDeleteModal(false);
      setCoachToDelete(null);

      MySwal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: `Entrenador ${coachToDelete.name} eliminado correctamente`,
        position: 'top',
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePageChange = (newPage) => fetchCoaches(newPage);

  return (
    <>
      {/* Título fuera del blur y overlay */}
      <div className="flex items-center mb-6 space-x-3">
        <FaUserTie className="text-blue-700 w-10 h-10" />
        <h2 className="text-3xl font-extrabold text-gray-900">Listado de Coaches</h2>
      </div>

      {/* Contenedor relativo y ancho completo para tabla + paginación */}
      <div className={`relative max-w-full ${loading ? 'pointer-events-none blur-[0.5px]' : ''}`}>
        {/* Overlay loading solo sobre este contenedor */}
        {loading && <LoadingOverlay fullScreen={false} message="Cargando coaches..." />}

        <CoachTable
          coaches={coaches}
          onViewDetails={handleViewDetails}
          onDelete={handleRequestDelete}
        />

        {pagination && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>

      {/* Modales y loading detalles */}
      {showDetailsModal && selectedCoach && (
        <CoachDetailsModal coach={selectedCoach} onClose={handleCloseDetails} />
      )}

      {detailsLoading && <LoadingOverlay message="Cargando detalles del coach..." />}

      {showDeleteModal && coachToDelete && (
        <ConfirmDeleteModal
          coach={coachToDelete}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
