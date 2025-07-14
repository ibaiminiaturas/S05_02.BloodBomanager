import React from 'react';

export default function CoachDetailsModal({ coach, onClose }) {
  return (
    <div style={modalStyle}>
      <h3>Detalles del Coach</h3>
      <p><strong>ID:</strong> {coach.id}</p>
      <p><strong>Nombre:</strong> {coach.name}</p>
      <p><strong>Email:</strong> {coach.email}</p>
      <p><strong>Fecha creación:</strong> {new Date(coach.created_at).toLocaleString()}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

const modalStyle = {
  position: 'fixed',
  top: '20%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  padding: '1rem 2rem',
  border: '1px solid black',
  zIndex: 1000,
};
