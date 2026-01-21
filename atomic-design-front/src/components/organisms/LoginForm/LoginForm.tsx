import { useState } from "react";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/button/Button";
// import Button from "../../atoms/button/Button";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  loading?: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange =
    (field: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Correo"
        id="email"
        type="email"
        placeholder="Ingresa tu correo"
        value={form.email}
        required
        onChange={handleChange("email")}
      />

      <FormField
        label="Contraseña"
        id="password"
        type="password"
        placeholder="Ingresa tu contraseña"
        value={form.password}
        required
        onChange={handleChange("password")}
      />

      <Button type={"submit"} contain="Ingresar" loading={loading} />
    </form>
  );
};

export default LoginForm;
