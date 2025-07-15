import React from 'react';

export default function CoachDetailsModal({ coach, onClose }) {
  if (!coach) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Detalles del Coach</h2>
        <p><strong>Nombre:</strong> {coach.name}</p>
        <p><strong>Email:</strong> {coach.email}</p>
        <p><strong>Creado:</strong> {new Date(coach.created_at).toLocaleString()}</p>

        <div style={{ marginTop: '1rem' }}>
          <h3>Equipos</h3>
          {coach.teams && coach.teams.length > 0 ? (
            <ul>
              {coach.teams.map(team => (
                <li key={team.id}>
                  <strong>{team.name}</strong> – Valor del equipo: {team.team_value} – Oro restante: {team.gold_remaining}
                </li>
              ))}
            </ul>
          ) : (
            <p>Este coach no tiene equipos registrados.</p>
          )}
        </div>

        <button onClick={onClose} style={{ marginTop: '1rem' }}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
  }
};
