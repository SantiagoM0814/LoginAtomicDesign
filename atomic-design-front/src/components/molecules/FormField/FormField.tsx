import Label from '../../atoms/label/Label';
import InputComponent from "../../atoms/input/Input";
import styles from "./FormField.module.css";

interface FormFieldProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password";
  value?: string;
  placeholder: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({
  label,
  id,
  type = "text",
  value,
  placeholder,
  required = false,
  onChange,
}: FormFieldProps) => {
  return (
    <div className={styles.formField}>
      <Label htmlFor={id} label={label} required={required}/>
      <InputComponent
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
