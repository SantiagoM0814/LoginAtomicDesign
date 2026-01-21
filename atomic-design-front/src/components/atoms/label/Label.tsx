import styles from "./label.module.css";

interface LabelProps {
  htmlFor?: string;
  label: string;
  required?: boolean;
}

const Label = ({ htmlFor, label, required }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={styles.label}
    >
      {label}
      {required && <span className={styles.required}> *</span>}
    </label>
  );
};

export default Label;
