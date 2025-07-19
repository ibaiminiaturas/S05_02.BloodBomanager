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
   <div className="overflow-x-auto">
  <table className="w-full border border-gray-300 rounded-md shadow-sm">
    <thead>
      <tr className="bg-blue-600 text-white">
        <th className="py-2 px-4 text-left w-[220px]">Nombre</th>
        <th className="py-2 px-4 text-left w-[120px]">Experiencia (SPP)</th>
        <th className="py-2 px-4 text-left w-[150px]">Injuries</th>
        <th className="py-2 px-4 text-left w-[150px]">Posición</th>
        <th className="py-2 px-4 text-left w-[120px]">Max por equipo</th>
        <th className="py-2 px-4 text-left w-[90px]">Movimiento</th>
        <th className="py-2 px-4 text-left w-[80px]">Fuerza</th>
        <th className="py-2 px-4 text-left w-[80px]">Agilidad</th>
        <th className="py-2 px-4 text-left w-[80px]">Pase</th>
        <th className="py-2 px-4 text-left w-[80px]">Armadura</th>
        <th className="py-2 px-4 text-left w-[90px]">Costo</th>
        <th className="py-2 px-4 text-center w-[140px]">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {players.map((player, i) => (
        <tr key={player.id} className={i % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}>
          <td className="py-2 px-4 truncate max-w-[220px]">{player.name}</td>
          <td className="py-2 px-4 truncate max-w-[120px]">{player.spp}</td>
          <td className="py-2 px-4 truncate max-w-[150px]">{player.injuries || 'Ninguna'}</td>
          <td className="py-2 px-4 truncate max-w-[150px]">{player.player_type?.name || '—'}</td>
          <td className="py-2 px-4 truncate max-w-[120px]">{player.player_type?.max_per_team || '—'}</td>
          <td className="py-2 px-4 truncate max-w-[90px]">{player.player_type?.movement || '—'}</td>
          <td className="py-2 px-4 truncate max-w-[80px]">{player.player_type?.strength || '—'}</td>
          <td className="py-2 px-4 truncate max-w-[80px]">
            {player.player_type?.agility ? `${player.player_type.agility}+` : '—'}
          </td>
          <td className="py-2 px-4 truncate max-w-[80px]">
            {player.player_type?.passing ? `${player.player_type.passing}+` : '—'}
          </td>
          <td className="py-2 px-4 truncate max-w-[80px]">
            {player.player_type?.armor ? `${player.player_type.armor}+` : '—'}
          </td>
          <td className="py-2 px-4 truncate max-w-[90px]">{player.player_type?.cost || '—'}</td>
          <td className="py-2 px-4 flex justify-center space-x-2">
            <button
              onClick={() => onEdit(player)}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md shadow-sm transition"
              title="Editar jugador"
            >
              <BiPencil size={18} />
              Editar
            </button>
            <button
              onClick={() => onDelete(player)}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-sm transition"
              title="Eliminar jugador"
            >
              <FaTrash size={18} />
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}
