import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { FaFootballBall } from 'react-icons/fa';
import TeamsTable from '../components/TeamsTable.jsx';
import TeamEditModal from '../components/TeamEditModal.jsx';
import Pagination from '../components/Pagination.jsx';  // <- IMPORTA este componente
import MySwal from '../utils/MySwal.js';
import TeamCreateModal from '../components/TeamCreateModal.jsx';

export default function Teams() {
    const { token } = useAuth();

    const [teams, setTeams] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchTeams = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('Error al obtener los equipos');

            const data = await res.json();
            setTeams(data.data.data);       // datos de la página actual (suponiendo estructura Laravel)
            setPagination(data.data);       // meta y links de paginación
            setError('');
        } catch (err) {
            setError(err.message);
            MySwal.fire({
                icon: 'error',
                title: 'Error al obtener equipos',
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTeams();
        }
    }, [token]);

    const handleEdit = (team) => {
        setSelectedTeam(team);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setSelectedTeam(null);
        setShowEditModal(false);
    };

const handleSaveEditedTeam = async (updatedTeam) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${updatedTeam.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: updatedTeam.name,
        team_value: updatedTeam.team_value,
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

      const errText = data.message || 'Error al actualizar el equipo';
      throw new Error(errText);
    }

    const updatedData = data.data || data;
    const updatedList = teams.map(t => t.id === updatedData.id ? updatedData : t);
    setTeams(updatedList);
    
    handleCloseEditModal();

    return MySwal.fire({
      icon: 'success',
      title: 'Equipo actualizado',
      text: `El equipo "${updatedData.name}" se actualizó correctamente.`,
      timer: 2000,
      showConfirmButton: false,
    });

  } catch (err) {
    return MySwal.fire({
      icon: 'error',
      title: 'Error al guardar cambios',
      text: err.message || 'Ocurrió un error desconocido.',
    });
  }
};


    const handleDelete = async (team) => {
  const confirm = await MySwal.fire({
    title: `¿Eliminar equipo "${team.name}"?`,
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      overlay: 'bg-transparent',
    },
  });

  if (!confirm.isConfirmed) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${team.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const errText = data.message || 'Error al eliminar el equipo';
      throw new Error(errText);
    }

    const updatedList = teams.filter(t => t.id !== team.id);
    setTeams(updatedList);
    

    MySwal.fire({
      icon: 'success',
      title: 'Equipo eliminado',
      text: `El equipo "${team.name}" se eliminó correctamente.`,
      timer: 2000,
      showConfirmButton: false,
    });

  } catch (err) {
    MySwal.fire({
      icon: 'error',
      title: 'Error al eliminar equipo',
      text: err.message || 'Ocurrió un error desconocido.',
    });
  }
};


    const handlePageChange = (newPage) => {
        fetchTeams(newPage);
    };

    return (
        <>
            {/* Título */}
            <div className="flex items-center mb-6 space-x-3 ml-4">
                <FaFootballBall className="text-blue-600 w-10 h-10" />
                <h2 className="text-3xl font-extrabold text-gray-900">Listado de Equipos</h2>
            </div>

            {/* Contenido */}
            <div className={`relative max-w-full ${loading ? 'pointer-events-none blur-[0.5px]' : ''}`}>
                {loading && <LoadingOverlay fullScreen={false} message="Cargando equipos..." />}

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md max-w-4xl mx-auto mb-4">
                        {error}
                    </div>
                )}

                <TeamsTable teams={teams} onEdit={handleEdit} onDelete={handleDelete} />

                {pagination && (
                    <Pagination pagination={pagination} onPageChange={handlePageChange} />
                )}

                <div className="mt-4 flex justify-center">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                    onClick={() => setShowCreateModal(true)}
                >
                    Crear Equipo
                </button>
                </div>
            </div>

            {/* Modal de edición */}
            {showEditModal && selectedTeam && (
                <TeamEditModal
                    team={selectedTeam}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveEditedTeam}
                />
            )}
{showCreateModal && (
  <TeamCreateModal
    onClose={() => setShowCreateModal(false)}
    onCreate={async (newTeam) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTeam),
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
          throw new Error(data.message || 'Error al crear el equipo');
        }

        // Añadir el nuevo equipo a la lista y cache
        setTeams((prev) => {
          const updated = [data.data || data, ...prev];
          
          return updated;
        });

        setShowCreateModal(false);

        MySwal.fire({
          icon: 'success',
          title: 'Equipo creado',
          text: `El equipo "${newTeam.name}" se creó correctamente.`,
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        MySwal.fire({
          icon: 'error',
          title: 'Error al crear equipo',
          text: err.message,
        });
      }
    }}
  />
)}

        </>
    );
}
