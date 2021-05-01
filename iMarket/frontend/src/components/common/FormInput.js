const FormInput = ({
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    inputHelp,
}) => {
    return (
        <div className="mb-3">
            {label && <label htmlFor={name} className="form-label">{label}</label>}
            <input type={type} className="form-control" name={name} id={name} aria-describedby={`${name}Help`} value={value} onChange={onChange} placeholder={placeholder}/>
            {inputHelp && <div id={`${name}Help`} className="form-text">{inputHelp}</div>}
        </div>
    )
}
export default FormInput;