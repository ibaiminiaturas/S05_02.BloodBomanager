import React, { useEffect, useState } from "react";
import LoadingOverlay from "../components/LoadingOverlay.jsx";

export default function Status() {
  const [status, setStatus] = useState(null); // null = en carga, string = mensaje
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/status`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Respuesta no válida");
        }
        return res.json();
      })
      .then((data) => {
        setStatus(data.message);
      })
      .catch((err) => {
        
        setError("Error de conexión");
        setStatus(""); // Para detener el loading
      });
  }, []);

  const isLoading = status === null;

  return (
    <div className="relative max-w-full">
      {isLoading && (
        <LoadingOverlay fullScreen={false} message="Cargando estado..." />
      )}

      <h1 className="text-2xl font-bold mb-4">Status API</h1>
      <p>{error || status}</p>
    </div>
  );
}
