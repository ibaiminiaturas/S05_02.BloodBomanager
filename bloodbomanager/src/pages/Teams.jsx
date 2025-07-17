// src/pages/Teams.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { FaFootballBall } from 'react-icons/fa';
import TeamsTable from '../components/TeamsTable.jsx'; // Crea o ajusta este componente
const STORAGE_KEY = 'cachedTeams';

export default function Teams() {
    const { token } = useAuth();

    const [teams, setTeams] = useState(() => {
        const cached = sessionStorage.getItem(STORAGE_KEY);
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(teams.length === 0);
    const [error, setError] = useState('');

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && teams.length === 0) {
            fetchTeams();
        }
    }, [token]);

    return (
        <>
            <div className="flex items-center mb-6 space-x-3 ml-4">
                <FaFootballBall className="text-blue-600 w-10 h-10" />
                <h2 className="text-3xl font-extrabold text-gray-900">Listado de Equipos</h2>
            </div>

            <div className={`relative max-w-full ${loading ? 'pointer-events-none blur-[0.5px]' : ''}`}>
                {loading && <LoadingOverlay fullScreen={false} message="Cargando equipos..." />}

                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md max-w-4xl mx-auto mb-4">
                        {error}
                    </div>
                )}

                <TeamsTable teams={teams} />
            </div>
        </>
    );
}
