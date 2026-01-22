import React from 'react';
import Label from '../../atoms/label/Label';
import Input from '../../atoms/input/Input';
import './FormField.css';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ id, label, type = 'text', value, onChange }) => (
  <div className="form-field">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} value={value} onChange={onChange} />
  </div>
);

export default FormField;
