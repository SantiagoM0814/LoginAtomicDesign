import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPageStyles.css';

interface DashboardPageProps {
  userName: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">¡Bienvenido!</h1>
        <div className="dashboard-welcome">{userName}</div>
        <div className="dashboard-info">Has iniciado sesión correctamente.</div>
        <div className="dashboard-info">Explora la aplicación o navega por el menú.</div>
        <button className="dashboard-logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
