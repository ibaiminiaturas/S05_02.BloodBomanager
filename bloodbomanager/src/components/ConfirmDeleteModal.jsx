import React from 'react';

export default function ConfirmDeleteModal({ coach, onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Confirmar eliminación</h3>
        <p>¿Estás seguro de eliminar al coach <strong>{coach.name}</strong>?</p>
        <button onClick={onConfirm} style={{ marginRight: '10px' }}>Sí, eliminar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};
