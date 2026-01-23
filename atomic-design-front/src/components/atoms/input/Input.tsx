import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}


const Input: React.FC<InputProps> = ({ placeholder, ...props }) => (
  <input className="input" placeholder={placeholder} {...props} />
);

export default Input;
