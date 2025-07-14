import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import CoachTable from '../components/CoachTable';
import CoachDetailsModal from '../components/CoachDetailsModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import Pagination from '../components/Pagination.jsx';

export default function Coaches() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCoach, setSelectedCoach] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [coachToDelete, setCoachToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // fetch coaches con paginacion y token
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

  const handleViewDetails = (coach) => {
    setSelectedCoach(coach);
    setShowDetailsModal(true);
  };

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
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePageChange = (newPage) => {
    fetchCoaches(newPage);
  };

  if (loading) return <p>Cargando coaches...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Listado de Coaches</h2>

      <CoachTable
        coaches={coaches}
        onViewDetails={handleViewDetails}
        onDelete={handleRequestDelete}
      />

        {pagination && (
        <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
        />
        )}
      {showDetailsModal && selectedCoach && (
        <CoachDetailsModal coach={selectedCoach} onClose={handleCloseDetails} />
      )}

      {showDeleteModal && coachToDelete && (
        <ConfirmDeleteModal
          coach={coachToDelete}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
