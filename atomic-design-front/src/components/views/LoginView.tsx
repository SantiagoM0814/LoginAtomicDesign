import { useState } from "react";
import LoginForm from "../organisms/LoginForm/LoginForm";
import { login, type LoginPayload } from "../../apis/authApi";

const LoginView = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: LoginPayload) => {
    try {
      setLoading(true);
      await login(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm onSubmit={handleLogin} loading={loading} />;
};

export default LoginView;
