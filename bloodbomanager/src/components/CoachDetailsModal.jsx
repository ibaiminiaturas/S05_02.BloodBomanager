import React from 'react';

export default function CoachDetailsModal({ coach, onClose, onDeleteRequest }) {
  if (!coach) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-48 z-50 pointer-events-none">

      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-[90%] p-6 relative pointer-events-auto"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <h2 className="text-2xl font-bold mb-4">Detalles del Coach</h2>

        <p><span className="font-semibold">Nombre:</span> {coach.name}</p>
        <p><span className="font-semibold">Email:</span> {coach.email}</p>
        <p><span className="font-semibold">Creado:</span> {new Date(coach.created_at).toLocaleString()}</p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Equipos</h3>
          {coach.teams && coach.teams.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 max-h-48 overflow-auto">
              {coach.teams.map(team => (
                <li key={team.id}>
                  <span className="font-semibold">{team.name}</span> – Valor: {team.team_value} – Oro restante: {team.gold_remaining}
                </li>
              ))}
            </ul>
          ) : (
            <p className="italic text-gray-500">Este coach no tiene equipos registrados.</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition"
          >
            Cerrar
          </button>

          <button
            onClick={() => onDeleteRequest(coach)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
