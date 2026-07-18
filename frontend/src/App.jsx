import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <footer className="footer">
            <p>Sistema de Reservaciones para Restaurante — Arquitectura Orientada a Servicios 2026</p>
          </footer>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
