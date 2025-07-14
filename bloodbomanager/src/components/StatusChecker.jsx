import React, { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const StatusChecker = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/status`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setStatus(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Estado de la API</h2>
      {error && <p className="text-red-600">❌ Error: {error}</p>}
      {status ? (
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(status, null, 2)}</pre>
      ) : (
        !error && <p>Cargando...</p>
      )}
    </div>
  );
};

export default StatusChecker;