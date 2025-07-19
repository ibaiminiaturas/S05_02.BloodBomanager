import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { FaFootballBall } from 'react-icons/fa';
import TeamsTable from '../components/TeamsTable.jsx';
import TeamEditModal from '../components/TeamEditModal.jsx';
import Pagination from '../components/Pagination.jsx';
import MySwal from '../utils/MySwal.js';
import TeamCreateModal from '../components/TeamCreateModal.jsx';
import TeamViewModal from '../components/TeamViewModal.jsx';
import PlayerEditModal from '../components/PlayerEditModal';

export default function Teams() {
    const { token } = useAuth();

    const [teams, setTeams] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showTeamModal, setShowTeamModal] = useState(false);

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


    const fetchTeams = async (page = 1) => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams?page=${page}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('Error al obtener los equipos');

            const data = await res.json();

            setTeams(data.data.data);
            setPagination(data.data);
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

    const handleView = async (team) => {
        try {

            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${team.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error al obtener los datos del equipo');
            }

            setSelectedTeam(data.data);
            setShowTeamModal(true);
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Error al visualizar equipo',
                text: err.message || 'Ocurrió un error desconocido.',
            });
        }
    };

    const handlePageChange = (newPage) => {
        fetchTeams(newPage);
    };

    const handleModalEdit = (player) => {
        // Ahora abre el modal para editar jugador, no solo alerta
        handleEditPlayer(player);
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

                <TeamsTable teams={teams} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

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

            {/* Modal de creación */}
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

                            setTeams((prev) => [data.data || data, ...prev]);
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

             {showTeamModal && selectedTeam && (
                <TeamViewModal
                    isOpen={showTeamModal}
                    onClose={() => setShowTeamModal(false)}
                    team={selectedTeam}
                    onEditPlayer={handleEditPlayer}
                    onDeletePlayer={handleDeletePlayer}  // <-- pasar la función completa
                />
            )}

            {isPlayerEditOpen && playerToEdit && (
                <PlayerEditModal
                    isOpen={isPlayerEditOpen}
                    onClose={handleClosePlayerEdit}
                    player={playerToEdit}
                    onSave={handleSavePlayer}
                />
            )}
        </>
    );
}
