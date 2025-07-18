// src/components/PlayerEditModal.jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import MySwal from '../utils/MySwal.js';  // SweetAlert configurado

export default function PlayerEditModal({ player, onClose, onSave }) {
  const [spp, setSpp] = useState(player.spp ?? 0);
  const [injuries, setInjuries] = useState(player.injuries || '');

  useEffect(() => {
    setSpp(player.spp ?? 0);
    setInjuries(player.injuries || '');
  }, [player]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(spp) || spp < 0) {
      MySwal.fire({
        icon: 'error',
        title: 'Datos inválidos',
        text: 'SPP debe ser un número entero mayor o igual a 0.',
      });
      return;
    }

    const updatedPlayer = {
      ...player,
      spp: Number(spp),
      injuries,
    };

    onSave(updatedPlayer);
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[400px]">
        <h3 className="text-xl font-bold text-blue-700 mb-4">Editar jugador: {player.name}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Experiencia (SPP)</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={spp}
              onChange={(e) => setSpp(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Lesiones</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
