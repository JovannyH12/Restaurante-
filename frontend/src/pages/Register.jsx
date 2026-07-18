import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== confirmPassword) {
      setError('Las contrasenas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const data = { ...form };
      if (!data.telefono) delete data.telefono;
      await register(data);
      navigate('/login', { state: { message: 'Registro exitoso! Ahora inicia sesion.' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-center">
      <div className="card form-card">
        <h2>Crear Cuenta</h2>
        <p className="subtitle">HU-01 — Registrarme para hacer reservaciones</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" required />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Tu apellido" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" required />
          </div>

          <div className="form-group">
            <label>Telefono (opcional)</label>
            <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} placeholder="7712345678" />
          </div>

          <div className="form-group">
            <label>Contrasena</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Minimo 6 caracteres" minLength="6" required />
          </div>

          <div className="form-group">
            <label>Confirmar contrasena</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite tu contrasena" minLength="6" required />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>

        <p className="form-footer">
          Ya tienes cuenta? <Link to="/login">Iniciar sesion</Link>
        </p>
      </div>
    </div>
  );
}
