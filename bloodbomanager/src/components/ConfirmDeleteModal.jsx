import React from 'react';

export default function ConfirmDeleteModal({ coach, onCancel, onConfirm }) {
  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Confirmar eliminación
        </h3>
        <p className="text-gray-700 text-center mb-6">
          ¿Estás seguro de que quieres eliminar al coach{' '}
          <strong className="text-red-600">{coach.name}</strong>?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
