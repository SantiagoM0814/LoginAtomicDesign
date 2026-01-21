import Label from '../../atoms/label/Label';
import InputComponent from "../../atoms/input/Input";
import styles from "./FormField.module.css";

interface FormFieldProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password";
  value?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({
  label,
  id,
  type = "text",
  value,
  placeholder: string,
  required = false,
  error,
  disabled = false,
  onChange,
}: FormFieldProps) => {
  return (
    <div className={styles.formField}>
      <Label htmlFor={id} required={required}/>
      <InputComponent
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className={error ? styles.error : ""}
      />
      {error && <small className={styles.errorMessage}>{error}</small>}
    </div>
  );
};

export default FormField;
