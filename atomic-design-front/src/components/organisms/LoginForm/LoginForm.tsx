import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/button/Button';
import { loginApi } from '../../../apis/authApi';
import './LoginForm.css';

interface LoginFormProps {
  onSubmit: (userName: string) => void;
}

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccess(false);
    const newErrors: { email?: string; password?: string } = {};
    if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Espera que el backend devuelva { name: string, ... }
        const result = await loginApi(email, password);
        setSuccess(true);
        onSubmit(result.name || email.split('@')[0]);
      } catch (err: any) {
        setApiError(err.message || 'Error al iniciar sesión');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <span className="login-form__error">{errors.email}</span>}
      </div>
      <div className="login-form__field">
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && <span className="login-form__error">{errors.password}</span>}
      </div>
      <Button type="submit" className="login-form__button" disabled={loading}>
        {loading ? 'Validando...' : 'Iniciar sesión'}
      </Button>
      {apiError && <span className="login-form__api-error">{apiError}</span>}
      {success && <span className="login-form__success">¡Login exitoso!</span>}
    </form>
  );
};

export default LoginForm;
