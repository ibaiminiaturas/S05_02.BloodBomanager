import React from 'react';
import { BiPencil } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa'; 

export default function TeamsTable({ teams, onEdit, onDelete, onView }) {

    if (!teams || teams.length === 0) {
        return (
            <div className="bg-blue-100 text-blue-700 p-6 rounded-md shadow-md text-center max-w-4xl mx-auto mt-10">
                <p>No hay equipos registrados todavía.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto max-w-full ml-4 mr-4">
            <table className="w-full min-w-full border border-gray-300 rounded-md overflow-hidden shadow-md">
                <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="py-3 px-4 text-left w-[50px]">ID</th>
                        <th className="py-3 px-4 text-left w-[200px]">Nombre</th>
                        <th className="py-3 px-4 text-left w-[200px]">Entrenador</th>
                        <th className="py-3 px-4 text-left w-[200px]">Roster</th>
                        <th className="py-3 px-4 text-left w-[200px]">Oro disponible</th>
                        <th className="py-3 px-4 text-left w-[200px]">Valor de equipo</th>
                        <th className="py-3 px-4 text-left w-[150px]">Creado</th>
                        <th className="py-3 px-4 text-center w-[180px]">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {teams.map((team, i) => {
                        const createdDate = new Date(team.created_at).toLocaleDateString();
                        return (
                            <tr
                                key={team.id}
                                className={i % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}
                            >
                                <td className="py-2 px-4 truncate max-w-[50px]">{team.id}</td>
                                <td className="py-2 px-4 truncate max-w-[200px]">{team.name}</td>
                                <td className="py-2 px-4 truncate max-w-[200px]">{team.coach?.name || '—'}</td>
                                <td className="py-2 px-4 truncate max-w-[200px]">{team.roster?.name || '—'}</td>
                                <td className="py-2 px-4 truncate max-w-[200px]">{team.gold_remaining}</td>
                                <td className="py-2 px-4 truncate max-w-[200px]">{team.team_value}</td>
                                <td className="py-2 px-4 truncate max-w-[150px]">{createdDate}</td>
                                <td className="py-2 px-4 flex space-x-2 justify-center">
                                    <button
                                        onClick={() => onView(team)}
                                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                                    >
                                        <FaSearch size={16} />
                                        Alineación
                                    </button>
                                    <button
                                        onClick={() => onEdit(team)}
                                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                                    >
                                        <BiPencil size={18} />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(team)}
                                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                                    >
                                        <FaTrash size={18} />
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
