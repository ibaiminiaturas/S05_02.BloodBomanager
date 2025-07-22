import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../utils/AuthContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { FaDiceD20, FaTrophy } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function SimulateMatch() {
    const { token } = useAuth();
    const [teams, setTeams] = useState([]);
    const [team1Id, setTeam1Id] = useState('');
    const [team2Id, setTeam2Id] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeams = async () => {
            if (!token) return;
            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/teams`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setTeams(data?.data?.data || []);
            } catch (err) {
                setError('Error al cargar equipos');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [token]);

    const handleSimulate = async () => {
        if (!team1Id || !team2Id) return;

        setIsSimulating(true);
        setResult(null);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/matches/simulate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    team_1_id: team1Id,
                    team_2_id: team2Id,
                }),
            });

            if (!res.ok) throw new Error('Simulación fallida');

            const data = await res.json();
            setResult(data);
            setError('');
        } catch (err) {
            setError(err.message);
            Swal.fire('Error', err.message, 'error');
        } finally {
            setIsSimulating(false);
        }
    };

    return (
        <>
            {/* Título con icono y texto igual que Teams.jsx */}
            <div className="flex items-center mb-6 space-x-3 ml-4">
                <FaDiceD20 className="text-blue-600 w-8 h-8 animate-spin-slow" />
                <h2 className="text-3xl font-extrabold text-gray-900">Simular Partido</h2>
            </div>

            {/* Contenedor principal sin fondo, con blur y bloqueo si loading */}
            <div className={`relative max-w-full  ml-4 ${loading ? 'pointer-events-none blur-[0.5px]' : ''}`}>
                {/* Selección de equipos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mb-6">
                    {[{ label: 'Equipo 1', value: team1Id, set: setTeam1Id }, { label: 'Equipo 2', value: team2Id, set: setTeam2Id }].map((teamSelect, index) => (
                        <div key={index}>
                            <label className="block text-gray-700 font-semibold mb-2">{teamSelect.label}</label>
                            <select
                                className="w-full px-4 py-2 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={teamSelect.value}
                                onChange={(e) => teamSelect.set(e.target.value)}
                            >
                                <option value="">-- Selecciona {teamSelect.label.toLowerCase()} --</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <button
                        disabled={!team1Id || !team2Id}
                        onClick={handleSimulate}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-lg ${(!team1Id || !team2Id) && 'opacity-50 cursor-not-allowed'
                            }`}
                    >
                        🧠 Simular Partido
                    </button>
                </div>

                {isSimulating && <LoadingOverlay message="Simulando batalla en el campo..." fullScreen={false} />}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 shadow-glow rounded-xl p-8 max-w-5xl mx-auto border border-cyan-400 relative overflow-hidden"
                    >
                        {/* Brillito animado */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <div className="animate-shimmer absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                        </div>

                        <h3 className="text-3xl font-extrabold text-center mb-8 text-cyan-300 uppercase tracking-wider drop-shadow-lg">
                            Resultado del Partido
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[result.team_1, result.team_2].map((team, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-tr from-cyan-700 to-cyan-900 rounded-xl p-8 border-l-8 border-cyan-400 shadow-neon relative text-white"
                                >
                                    <h4 className="text-2xl font-extrabold mb-3 drop-shadow-md">{team.name}</h4>
                                    <p className="text-cyan-300 font-semibold text-xl mb-4 tracking-wide flex items-center gap-2">
                                        🏈 Touchdowns: <span className="text-3xl font-extrabold">{team.touchdowns}</span>
                                    </p>
                                    <ul className="text-cyan-200 space-y-2 font-semibold text-lg max-h-48 overflow-auto pr-2">
                                        {team.scorers.map((player, i) => (
                                            <li
                                                key={i}
                                                className="hover:text-cyan-300 transition-colors duration-300 cursor-default"
                                            >
                                                <span className="font-extrabold">{player.player_name}</span>: {player.touchdowns} TD
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Efecto glow pulsante */}
                                    <span className="absolute -top-3 -left-3 w-12 h-12 rounded-full bg-cyan-400 opacity-50 blur-xl animate-pulse"></span>
                                    <span className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-cyan-300 opacity-40 blur-3xl animate-pulse animation-delay-2000"></span>
                                </div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
                            className="mt-12 text-center"
                        >
                            <div className="inline-flex items-center bg-cyan-300 bg-opacity-30 text-cyan-900 px-8 py-4 rounded-full shadow-neon text-2xl font-extrabold tracking-wide animate-pulse gap-4 select-none">
                                <FaTrophy className="text-cyan-400 animate-bounce drop-shadow-lg" />
                                ¡Ganador: {result.winner}!
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </>
    );
}
