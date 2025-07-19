import React from 'react';
import PlayerTable from './PlayersTable';

export default function TeamViewModal({ team, onClose, onEditPlayer, onDeletePlayer }) {
  if (!team) return null;

  return (
    <>
      {/* Fondo transparente */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Contenedor modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   bg-blue-200 rounded-md shadow-lg p-6 z-50 max-w-fit max-h-[90vh] overflow-y-auto border-4 border-blue-700"
        onClick={e => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold transition"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-blue-800">
          Equipo: {team.name}
        </h2>

        <h3 className="text-xl font-semibold mb-4 text-blue-700">Jugadores</h3>

        <PlayerTable
          players={team.team_players}
          onEdit={onEditPlayer}
          onDelete={onDeletePlayer}
            showActions={false}
        />
      </div>
    </>
  );
}
