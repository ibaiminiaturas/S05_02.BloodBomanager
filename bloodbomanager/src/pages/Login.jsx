import React, { useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();


    
    try {

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',     'Accept': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
        const data = await res.json();
        console.log(data)
        if (res.ok) {
            const token = data.access_token;  // <-- aquí está el token esperado

            if (token) {
              Swal.fire({
          icon: 'success',
          title: '¡Login exitoso!',
          timer: 2000,
          showConfirmButton: false,
            position: 'top',
        });
                await login(token);
                navigate('/dashboard');
            } else {
                 Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se recibió token del servidor',
            position: 'top',
        });
            }
            } else {
            Swal.fire({
        icon: 'error',
        title: 'Error de login',
        text: data.message || 'Credenciales incorrectas',
          position: 'top',
      });
            }
        } catch {
           console.error(error);  
           Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor',
        position: 'top',
    });
        }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Login</button>

    <p className="mt-4 text-sm text-center">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
        </Link>
        
    </p>
    </form>
  );
}
