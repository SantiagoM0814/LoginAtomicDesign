import React, { useState } from 'react';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/button/Button';
import { registerApi } from '../../../apis/registerApi';
import './RegisterForm.css';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
}

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setSuccess(false);
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!name) {
      newErrors.name = 'El nombre es obligatorio';
    }
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
        await registerApi(name, email, password);
        setSuccess(true);
        onSubmit(name, email, password);
      } catch (err: any) {
        setApiError(err.message || 'Error al registrarse');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="register-form__field">
        <FormField
          id="name"
          label="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && <span className="register-form__error">{errors.name}</span>}
      </div>
      <div className="register-form__field">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && <span className="register-form__error">{errors.email}</span>}
      </div>
      <div className="register-form__field">
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errors.password && <span className="register-form__error">{errors.password}</span>}
      </div>
      <Button type="submit" className="register-form__button" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
      {apiError && <span className="register-form__api-error">{apiError}</span>}
      {success && <span className="register-form__success">¡Registro exitoso!</span>}
    </form>
  );
};

export default RegisterForm;
