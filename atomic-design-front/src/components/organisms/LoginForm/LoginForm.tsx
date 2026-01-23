import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/button/Button';
import { loginApi } from '../../../apis/authApi';
import './LoginForm.css';

interface LoginFormProps {
  onSubmit: (_userName: string) => void;
}

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


const LoginForm: React.FC<LoginFormProps> = ({ onSubmit: _onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (_e: React.FormEvent) => {
    _e.preventDefault();
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
        _onSubmit(result.nombre || email.split('@')[0]);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
        setApiError(message);
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
          placeholder="Ingresa tu email"
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
          placeholder="Ingresa tu contraseña"
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
