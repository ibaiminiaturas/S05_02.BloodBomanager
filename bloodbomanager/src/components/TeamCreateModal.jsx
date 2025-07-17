import React, { useState } from 'react';

export default function TeamCreateModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    name: '',
    coach: '',
    roster: '',
    gold_remaining: '',
    team_value: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas aquí (opcional)

    onCreate({
      name: form.name,
      coach_id: form.coach,  // por ahora texto, después se cambiará a id
      roster_id: form.roster,
      gold_remaining: Number(form.gold_remaining),
      team_value: Number(form.team_value),
    });
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Crear nuevo equipo</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            name="coach"
            placeholder="Coach"
            value={form.coach}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="roster"
            placeholder="Roster"
            value={form.roster}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="gold_remaining"
            type="number"
            placeholder="Gold Remaining"
            value={form.gold_remaining}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
          <input
            name="team_value"
            type="number"
            placeholder="Team Value"
            value={form.team_value}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />

          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
