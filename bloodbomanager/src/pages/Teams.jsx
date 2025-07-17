import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { FaFootballBall } from 'react-icons/fa';
import TeamsTable from '../components/TeamsTable.jsx';
import TeamEditModal from '../components/TeamEditModal.jsx';
import MySwal from '../utils/MySwal.js';

const STORAGE_KEY = 'cachedTeams';

export default function Teams() {
    const { token } = useAuth();

    const [teams, setTeams] = useState(() => {
        const cached = sessionStorage.getItem(STORAGE_KEY);
        return cached ? JSON.parse(cached) : [];
    });

    const [loading, setLoading] = useState(teams.length === 0);
    const [error, setError] = useState('');

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchTeams = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('Error al obtener los equipos');

            const data = await res.json();
            setTeams(data.data);
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
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
        if (token && teams.length === 0) {
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
                    "Accept": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: updatedTeam.name,
                    team_value: updatedTeam.team_value,
                }),
            });

            const data = await res.json(); // LEEMOS JSON SIEMPRE

            if (!res.ok) {
                // Si es validación (422)
                if (res.status === 422 && data.errors) {
                    const errorMessages = Object.values(data.errors).flat().join('\n');
                    return MySwal.fire({
                        icon: 'error',
                        title: 'Error de validación',
                        text: errorMessages,
                    });
                }

                // Otros errores con mensaje
                const errText = data.message || 'Error al actualizar el equipo';
                throw new Error(errText);
            }

            // ✅ Éxito
            const updatedData = data.data || data; // depende cómo venga el JSON
            const updatedList = teams.map(t =>
                t.id === updatedData.id ? updatedData : t
            );
            setTeams(updatedList);
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
            handleCloseEditModal();

            return MySwal.fire({
                icon: 'success',
                title: 'Equipo actualizado',
                text: `El equipo "${updatedData.name}" se actualizó correctamente.`,
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (err) {
            // Esto ocurre solo por fallo de red, CORS, JSON malformado, etc.
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
                overlay: 'bg-transparent'  // fondo transparente
            }
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${team.id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('Error al eliminar el equipo');

            const updatedList = teams.filter(t => t.id !== team.id);
            setTeams(updatedList);
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

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
                text: err.message,
            });
        }
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
            </div>

            {/* Modal de edición */}
            {showEditModal && selectedTeam && (
                <TeamEditModal
                    team={selectedTeam}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveEditedTeam}
                />
            )}
        </>
    );
}
