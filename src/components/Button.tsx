import styles from './Button.module.scss'

export function Button(props: { text: string; onClick: () => void }) {
    return (
        <button
            onClick={props.onClick}
            className={`${styles.button} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`} 
        >
            {props.text}
        </button>
    );
}