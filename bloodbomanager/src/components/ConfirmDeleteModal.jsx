import React from 'react';

export default function ConfirmDeleteModal({ coach, onCancel, onConfirm }) {
  return (
    <div style={modalStyle}>
      <h3>Confirmar eliminación</h3>
      <p>¿Estás seguro de eliminar al coach <strong>{coach.name}</strong>?</p>
      <button onClick={onConfirm} style={{ marginRight: '10px' }}>Sí, eliminar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
}

const modalStyle = {
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  padding: '1rem 2rem',
  border: '1px solid black',
  zIndex: 1000,
};
