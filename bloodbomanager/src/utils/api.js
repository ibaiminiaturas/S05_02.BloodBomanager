// src/utils/api.js
export async function postData(url = '', data = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la petición');
  }

  return response.json();
}

// utils/api.js
export async function fetchCurrentUser(token) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('No autorizado o error al obtener usuario');
  }

  const data = await res.json();
  return data.user;
}
