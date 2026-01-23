import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/pages/Login/LoginPage';
import RegisterPage from './components/pages/Register/RegisterPage';
import DashboardPage from './components/pages/Dashboard/DashboardPage';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={setUserName} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={userName ? <DashboardPage userName={userName} /> : <LoginPage onLogin={setUserName} />} />
      </Routes>
    </Router>
  );
};

export default App
