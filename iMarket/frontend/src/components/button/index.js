
const Button = ({
    children,
    onClick,
    color,
    size,
    disabled,
}) => {
    return (
        <button 
            type="button" 
            className={`btn btn-${color} btn-${size}`}
            onClick={onClick}
            disabled={disabled}
        >
        {children}
        </button>
    )
};

export default Button;