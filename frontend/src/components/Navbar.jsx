import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Restaurante AOS</Link>
      <div className="nav-links">
        <Link to="/" className={isActive('/')}>Inicio</Link>
        <Link to="/menu" className={isActive('/menu')}>Menu</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={isActive('/profile')}>Mi Cuenta</Link>
            <button className="btn-logout" onClick={logout}>Cerrar Sesion</button>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive('/login')}>Iniciar Sesion</Link>
            <Link to="/register" className="btn-nav">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
