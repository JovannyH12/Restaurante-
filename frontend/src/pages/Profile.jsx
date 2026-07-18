import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { sendNotification } from '../services/api';

export default function Profile() {
  const { user, logout } = useAuth();
  const [phone, setPhone] = useState('');
  const [notifResult, setNotifResult] = useState(null);
  const [notifError, setNotifError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend(channel) {
    if (!phone) {
      setNotifError('Ingresa un numero de telefono');
      return;
    }
    setNotifError('');
    setNotifResult(null);
    setLoading(true);

    try {
      const message = `Hola ${user.nombre}! Tu reservacion esta confirmada. Te esperamos en el restaurante.`;
      const result = await sendNotification(channel, phone, message);
      setNotifResult(`Confirmacion enviada por ${channel.toUpperCase()} (Provider: ${result.provider})`);
    } catch (err) {
      setNotifError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="card profile-card">
        <h2>Mi Perfil</h2>
        <div className="profile-data">
          <div className="profile-row"><strong>Nombre:</strong><span>{user?.nombre} {user?.apellido}</span></div>
          <div className="profile-row"><strong>Email:</strong><span>{user?.email}</span></div>
          <div className="profile-row"><strong>Rol:</strong><span>{user?.rol}</span></div>
          <div className="profile-row"><strong>ID:</strong><span>{user?.id}</span></div>
        </div>
        <button className="btn btn-secondary" onClick={logout}>Cerrar Sesion</button>
      </div>

      <div className="card profile-card">
        <h2>Confirmar Reservacion</h2>
        <p className="subtitle">HU-04 — Enviar confirmacion por WhatsApp o SMS</p>

        <div className="form-group">
          <label>Numero de telefono</label>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+527712345678" />
        </div>

        <div className="btn-row">
          <button className="btn btn-primary" onClick={() => handleSend('whatsapp')} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar WhatsApp'}
          </button>
          <button className="btn btn-secondary" onClick={() => handleSend('sms')} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar SMS'}
          </button>
        </div>

        {notifResult && <div className="alert alert-success">{notifResult}</div>}
        {notifError && <div className="alert alert-error">{notifError}</div>}
      </div>
    </main>
  );
}
