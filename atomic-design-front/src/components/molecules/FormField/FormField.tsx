import React from 'react';
import Label from '../../atoms/label/Label';
import Input from '../../atoms/input/Input';
import './FormField.css';


interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}


const FormField: React.FC<FormFieldProps> = ({ id, label, type = 'text', value, onChange: _onChange, placeholder }) => (
  <div className="form-field">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} value={value} onChange={_onChange} placeholder={placeholder} />
  </div>
);

export default FormField;
