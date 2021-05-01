
const Button = ({
    children,
    color,
    size,
    disabled,
    onClick,
    type,
}) => {
    return (
        <button type={type} className={`btn btn-${color} btn-${size} ${disabled && 'disabled'}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;