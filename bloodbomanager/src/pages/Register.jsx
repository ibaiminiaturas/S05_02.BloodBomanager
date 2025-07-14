import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      // Aquí usamos el login del context para guardar token y usuario
      login(data.token, data.user);
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setErrors({ general: "Error de red" });
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
        <input name="password_confirmation" type="password" placeholder="Confirmar contraseña" value={formData.password_confirmation} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>

      {errors && (
        <div>
          {Object.entries(errors).map(([field, msg]) => (
            <p key={field} style={{ color: "red" }}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Register;
