// src/components/RostersTable.jsx
import React from 'react';

export default function RostersTable({ rosters }) {
  if (!rosters || rosters.length === 0) {
    return (
      <div className="bg-green-100 text-green-700 p-6 rounded-md shadow-md text-center max-w-4xl mx-auto mt-10">
        <p>No hay rosters registrados todavía.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-w-full">
      <table className="w-full min-w-full border border-gray-300 rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-green-600 text-white">
            <th className="py-3 px-4 text-left w-[50px]">ID</th>
            <th className="py-3 px-4 text-left w-[200px]">Nombre</th>
            <th className="py-3 px-4 text-left w-[150px]">Raza</th>
            <th className="py-3 px-4 text-left">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {rosters.map((roster, i) => (
            <tr key={roster.id} className={i % 2 === 0 ? 'bg-green-50' : 'bg-green-100'}>
              <td className="py-2 px-4 truncate max-w-[50px]">{roster.id}</td>
              <td className="py-2 px-4 truncate max-w-[200px]">{roster.name}</td>
              <td className="py-2 px-4 truncate max-w-[150px]">{roster.race}</td>
              <td className="py-2 px-4">{roster.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
