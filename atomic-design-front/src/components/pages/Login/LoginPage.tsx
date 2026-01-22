import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../../organisms/LoginForm/LoginForm';
import './LoginPage.css';
import './LoginPageCustom.css';

interface LoginPageProps {
  onLogin: (userName: string) => void;
}


const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  // Recibe el nombre real del usuario desde LoginForm
  const handleLogin = (userName: string) => {
    onLogin(userName);
    navigate('/dashboard');
  };

  return (
    <div className="login-page-container">
      <div className="login-page-box">
        <h1 className="login-title">Inicio de sesión</h1>
        <LoginForm onSubmit={handleLogin} />
        <p className="login-register-link">
          ¿No tienes cuenta?{' '}
          <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
