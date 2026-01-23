import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../../organisms/RegisterForm/RegisterForm';
import './RegisterPage.css';
import './RegisterPageCustom.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/');
  };

  return (
    <div className="register-page-container">
      <div className="register-page-box">
        <h1 className="register-title">Registro</h1>
        <RegisterForm onSubmit={handleRegister} />
        <p className="register-login-link">
          ¿Ya tienes cuenta?{' '}
          <Link to="/">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
