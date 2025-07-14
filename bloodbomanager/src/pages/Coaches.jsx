import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthContext';

export default function Coaches() {
  const { token } = useAuth();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/coaches`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Error al obtener los coaches');
        }

        const data = await res.json();
        
        setCoaches(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, [token]);

  if (loading) return <p>Cargando coaches...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Listado de Coaches</h1>
      <ul>
        {coaches.map(coach => (
          <li key={coach.id}>
            {coach.name} ({coach.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
