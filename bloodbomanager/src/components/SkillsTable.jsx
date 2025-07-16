import React from 'react';

export default function SkillsTable({ skills }) {
  if (!skills || skills.length === 0) {
    return (
      <div className="bg-blue-100 text-blue-700 p-6 rounded-md shadow-md text-center max-w-4xl mx-auto mt-10">
        <p>No hay habilidades registradas todavía.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-w-full">
      <table className="w-full min-w-full border border-gray-300 rounded-md overflow-hidden shadow-md">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left w-[50px]">ID</th>
            <th className="py-3 px-4 text-left w-[200px]">Nombre</th>
            <th className="py-3 px-4 text-left">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, i) => (
            <tr key={skill.id} className={i % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}>
              <td className="py-2 px-4 truncate max-w-[50px]">{skill.id}</td>
              <td className="py-2 px-4 truncate max-w-[200px]">{skill.name}</td>
              <td className="py-2 px-4">{skill.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
