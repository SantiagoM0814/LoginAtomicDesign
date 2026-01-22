import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}


const Input: React.FC<InputProps> = ({ label, placeholder, ...props }) => (
  <input className="input" placeholder={placeholder} {...props} />
);

export default Input;
