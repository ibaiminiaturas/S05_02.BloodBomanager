import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CoachTable({ coaches, onViewDetails, onDelete }) {
  const navigate = useNavigate();

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Creado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {coaches.map(coach => {
          const createdDate = new Date(coach.created_at).toLocaleDateString();
          return (
            <tr key={coach.id}>
              <td>{coach.id}</td>
              <td>{coach.name}</td>
              <td>{coach.email}</td>
              <td>{createdDate}</td>
              <td>
                <button onClick={() => onViewDetails(coach)} style={{ marginRight: '10px' }}>
                  Ver detalles
                </button>
                <button onClick={() => onDelete(coach)}>
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
