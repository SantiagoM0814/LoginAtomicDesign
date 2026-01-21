import styles from './input.module.css';

interface PropsInput {
    id: string;
    placeholder: string;
    type?: "text" | "email" | "password";
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent=({id, placeholder, type = 'text', value, onChange}: PropsInput) => {
    return (
        <input id={id} className={styles.input} placeholder={placeholder} type={type} value={value} onChange={onChange}/>
    )
}

export default InputComponent;