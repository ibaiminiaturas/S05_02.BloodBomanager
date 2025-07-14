import React, { useEffect, useState } from "react";

export default function Status() {
  const [status, setStatus] = useState("Cargando...");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/status`)
      .then((res => {
        
      if (!res.ok) {
        throw new Error("Respuesta no válida");
      }
      return res.json();
    }))
      .then((data) => setStatus(data.message))
      .catch((err) => {console.error(err);setStatus("Error de conexión")});
  }, []);

  return (
    <div>
      <h1>Status API</h1>
      <p>{status}</p>
    </div>
  );
}
