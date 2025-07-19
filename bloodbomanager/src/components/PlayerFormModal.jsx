import React, { useState, useEffect } from 'react';

export default function PlayerFormModal({ isOpen, onClose, onSubmit, initialData = {} }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [injuries, setInjuries] = useState('');
  const [spp, setSpp] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setNumber(initialData.number || '');
      setInjuries(initialData.injuries || '');
      setSpp(initialData.spp || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number, injuries, spp });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          {initialData?.id ? 'Editar jugador' : 'Nuevo jugador'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Número</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lesiones</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SPP (experiencia)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={spp}
              onChange={(e) => setSpp(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
