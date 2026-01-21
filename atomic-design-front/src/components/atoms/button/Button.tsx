import styles from './button.module.css';

interface PropsButton {
    type?: 'submit' | 'button' | 'reset';
    loading?: boolean;
    contain: string;
    handleClic?: () => void; 
}

const Button=({type="button", loading, contain, handleClic}: PropsButton) => {
    return (
        <button className={styles.button} type={type} disabled={loading} onClick={handleClic}>
            {loading ? "CARGANDO..." : contain}
        </button>
    )
}

export default Button;