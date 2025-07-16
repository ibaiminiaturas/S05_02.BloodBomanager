import React from 'react';
import { FaUsers, FaTimes, FaTrash } from 'react-icons/fa';

export default function CoachDetailsModal({ coach, onClose, onDeleteRequest }) {
  if (!coach) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-48 z-50 pointer-events-none">
      <div
        className="bg-white rounded-xl shadow-2xl w-[90%] max-w-2xl p-6 pointer-events-auto border border-gray-200"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold text-blue-700 flex items-center gap-2">
            <FaUsers className="text-blue-600" />
            Detalles del Coach
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition text-xl"
            title="Cerrar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Info coach */}
        <div className="space-y-2 text-gray-800">
          <p><span className="font-semibold">Nombre:</span> {coach.name}</p>
          <p><span className="font-semibold">Email:</span> {coach.email}</p>
          <p><span className="font-semibold">Creado:</span> {new Date(coach.created_at).toLocaleString()}</p>
        </div>

        {/* Equipos */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-blue-700">Equipos</h3>
          {coach.teams && coach.teams.length > 0 ? (
            <ul className="grid gap-3 max-h-52 overflow-y-auto">
              {coach.teams.map(team => (
                <li
                  key={team.id}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                >
                  <p className="font-semibold text-blue-800">{team.name}</p>
                  <p className="text-sm text-gray-700">
                    Valor del equipo: <span className="font-medium">{team.team_value}</span>
                  </p>
                  <p className="text-sm text-gray-700">
                    Oro restante: <span className="font-medium">{team.gold_remaining}</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic text-gray-500">Este coach no tiene equipos registrados.</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition"
          >
            Cerrar
          </button>
          <button
            onClick={() => onDeleteRequest(coach)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-2 transition"
          >
            <FaTrash />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
