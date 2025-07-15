import React, { useState, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
                await login(token);
                navigate('/dashboard');
            } else {
                setError('No se recibió token del servidor');
            }
            } else {
            setError(data.message || 'Error en login');
            }
        } catch {
           console.error(error); setError('Error de conexión');
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
