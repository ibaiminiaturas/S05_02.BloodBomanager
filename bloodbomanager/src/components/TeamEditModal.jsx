// src/components/TeamEditModal.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import MySwal from '../utils/MySwal.js';  // Asumo que tienes SweetAlert configurado así

export default function TeamEditModal({ team, onClose, onSave }) {
    const [name, setName] = useState(team.name || '');
    const [teamValue, setTeamValue] = useState(team.team_value ?? null);

    useEffect(() => {
        setName(team.name || '');
        setTeamValue(team.team_value ?? null);
    }, [team]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.trim() === '' || (teamValue !== null && (isNaN(teamValue) || teamValue < 0))) {
            MySwal.fire({
                icon: 'error',
                title: 'Datos inválidos',
                text: 'Por favor, introduce un nombre válido y un valor de equipo válido (número mayor o igual a 0).',
            });
            return;
        }

        const updatedTeam = {
            ...team,
            name,
            team_value: teamValue,
        };

        onSave(updatedTeam);
    };

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[400px]">
                <h3 className="text-xl font-bold text-blue-700 mb-4">Editar equipo</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Nombre</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Valor de equipo</label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            value={teamValue ?? ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                setTeamValue(val === '' ? null : parseInt(val, 10));
                            }}
                            min="0"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
}
