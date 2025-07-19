import React from 'react';
import { BiPencil } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';

export default function PlayersTable({ players, onEdit, onDelete }) {
  if (!players || players.length === 0) {
    return (
      <div className="bg-blue-100 text-blue-700 p-6 rounded-md shadow-md text-center max-w-4xl mx-auto mt-10">
        <p>No hay jugadores registrados todavía.</p>
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
            <th className="py-3 px-4 text-left w-[150px]">Número</th>
            <th className="py-3 px-4 text-left w-[200px]">SPP</th>
            <th className="py-3 px-4 text-left w-[200px]">Heridas</th>
            <th className="py-3 px-4 text-left w-[200px]">Equipo</th>
            <th className="py-3 px-4 text-left w-[150px]">Creado</th>
            <th className="py-3 px-4 text-center w-[180px]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, i) => {
            const createdDate = new Date(player.created_at).toLocaleDateString();
            return (
              <tr
                key={player.id}
                className={i % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}
              >
                <td className="py-2 px-4 truncate max-w-[50px]">{player.id}</td>
                <td className="py-2 px-4 truncate max-w-[200px]">{player.name}</td>
                <td className="py-2 px-4 truncate max-w-[150px]">{player.player_number}</td>
                <td className="py-2 px-4 truncate max-w-[200px]">{player.spp || '0'}</td>
                <td className="py-2 px-4 truncate max-w-[200px]">{player.injuries || '—'}</td>
                <td className="py-2 px-4 truncate max-w-[200px]">{player.team?.name || '—'}</td>
                <td className="py-2 px-4 truncate max-w-[150px]">{createdDate}</td>
                <td className="py-2 px-4 flex space-x-2 justify-center">
                  <button
                    onClick={() => onEdit(player)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                  >
                    <BiPencil size={18} />
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(player)}
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
