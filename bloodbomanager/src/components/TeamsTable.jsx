import React from 'react';

export default function TeamsTable({ teams }) {
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
                        <th className="py-3 px-4 text-left w-[200px]">Roster</th>
                        <th className="py-3 px-4 text-left w-[200px]">Entrenador</th>
                        <th className="py-3 px-4 text-left w-[150px]">Creado</th>
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
                                <td className="py-2 px-4 truncate max-w-[200px]">{team.roster?.name || '—'}</td>
                                <td className="py-2 px-4 truncate max-w-[200px]">{team.coach?.name || '—'}</td>
                                <td className="py-2 px-4 truncate max-w-[150px]">{createdDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
