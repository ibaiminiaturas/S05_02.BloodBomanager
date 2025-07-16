// src/components/RostersTable.jsx
import React from 'react';

export default function RostersTable({ playerTypes }) {
  if (!playerTypes || playerTypes.length === 0) {
    return (
      <div className="bg-blue-100 text-blue-700 p-6 rounded-md shadow-md text-center max-w-4xl mx-auto mt-10">
        <p>No hay tipos de jugador registrados para este roster.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-w-full ml-4 mr-4">
      <table className="w-full min-w-[900px] table-fixed border border-gray-300 rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left w-[200px]">Nombre</th>
            <th className="py-3 px-4 text-left w-[70px]">Movimiento</th>
            <th className="py-3 px-4 text-left w-[70px]">Fuerza</th>
            <th className="py-3 px-4 text-left w-[70px]">Agilidad</th>
            <th className="py-3 px-4 text-left w-[70px]">Pase</th>
            <th className="py-3 px-4 text-left w-[70px]">Armadura</th>
            <th className="py-3 px-4 text-left w-[120px]">Coste</th>
            <th className="py-3 px-4 text-left w-[140px]">Máx. por equipo</th>
          </tr>
        </thead>
        <tbody>
          {playerTypes.map((player, i) => (
            <tr key={player.id} className={i % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}>
              <td className="py-2 px-4 truncate">{player.name}</td>
              <td className="py-2 px-4">{player.movement}</td>
              <td className="py-2 px-4">{player.strength}</td>
              <td className="py-2 px-4">{player.agility}+</td>
              <td className="py-2 px-4">{player.passing}+</td>
              <td className="py-2 px-4">{player.armor}+</td>
              <td className="py-2 px-4">{player.cost.toLocaleString()} gp</td>
              <td className="py-2 px-4">{player.max_per_team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
