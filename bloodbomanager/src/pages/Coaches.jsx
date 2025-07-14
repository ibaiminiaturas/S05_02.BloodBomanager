import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination.jsx';

export default function Coaches() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [coaches, setCoaches] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/coaches?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error al obtener los coaches');
        }

        const data = await res.json();

        setCoaches(data.data.data);
        setPagination(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, [token, page]);

  const handleDelete = async (coachId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este coach?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/coaches/${coachId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Error al eliminar el coach');
      }

      // Recarga la página actual (en lugar de filtrar en cliente)
      setPage(1);  // o setPage(page) para recargar misma página, o hacer un fetch extra
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando coaches...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Listado de Coaches</h2>
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
                  <button
                    onClick={() => navigate(`/coaches/${coach.id}`)}
                    style={{ marginRight: '10px' }}
                  >
                    Ver detalles
                  </button>
                  <button onClick={() => handleDelete(coach.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination pagination={pagination} onPageChange={setPage} />
    </div>
  );
}
