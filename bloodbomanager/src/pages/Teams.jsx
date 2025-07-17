import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { FaFootballBall } from 'react-icons/fa';
import TeamsTable from '../components/TeamsTable.jsx';
import TeamEditModal from '../components/TeamEditModal.jsx';
import Pagination from '../components/Pagination.jsx';  // <- IMPORTA este componente
import MySwal from '../utils/MySwal.js';

export default function Teams() {
    const { token } = useAuth();

    const [teams, setTeams] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

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
        // ... aquí tu código actual sin cambios ...
    };

    const handleDelete = async (team) => {
        // ... aquí tu código actual sin cambios ...
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
