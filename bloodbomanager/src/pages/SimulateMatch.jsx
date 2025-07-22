import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../utils/AuthContext.jsx';
import LoadingOverlay from '../components/LoadingOverlay.jsx';
import { FaFutbol } from 'react-icons/fa';

export default function SimulateMatch() {
    const { token } = useAuth();
    const [teams, setTeams] = useState([]);
    const [team1Id, setTeam1Id] = useState('');
    const [team2Id, setTeam2Id] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Cargar equipos
    useEffect(() => {
        if (!token) return;

        const fetchTeams = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error('Error al obtener los equipos');
                const data = await res.json();

                if (data?.data?.data && Array.isArray(data.data.data)) {
                    setTeams(data.data.data);
                    setError('');
                } else {
                    setTeams([]);
                    setError('Respuesta inesperada de la API');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [token]);

    const handleSimulateMatch = async () => {
        if (!team1Id || !team2Id) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/matches/simulate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    team_1_id: team1Id,
                    team_2_id: team2Id,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al simular el partido');
            }

            const data = await res.json();

            Swal.fire({
                title: 'Partido simulado',
                text: `Resultado: ${data?.result || 'verifica en el backend'}`,
                icon: 'success',
            });

        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.message,
                icon: 'error',
            });
        }
    };

    return (
        <>
            <div className="flex items-center mb-6 space-x-3 ml-4">
                <FaFutbol className="text-purple-600 w-10 h-10" />
                <h2 className="text-3xl font-extrabold text-gray-900">Simular Partido</h2>
            </div>

            {loading && <LoadingOverlay message="Cargando equipos..." fullScreen={false} />}

            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-md max-w-4xl mx-auto mb-4">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6 px-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Equipo 1</label>
                        <select
                            value={team1Id}
                            onChange={(e) => setTeam1Id(e.target.value)}
                            className="w-full px-4 py-2 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                        >
                            <option value="">-- Selecciona equipo 1 --</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Equipo 2</label>
                        <select
                            value={team2Id}
                            onChange={(e) => setTeam2Id(e.target.value)}
                            className="w-full px-4 py-2 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                        >
                            <option value="">-- Selecciona equipo 2 --</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="flex justify-center mb-12">
                <button
                    onClick={handleSimulateMatch}
                    disabled={!team1Id || !team2Id}
                    className={`${!team1Id || !team2Id
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700'
                        } text-white font-bold py-2 px-6 rounded shadow`}
                >
                    Simular partido
                </button>
            </div>
        </>
    );
}
