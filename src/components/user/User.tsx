import React from 'react'
import './Form.css';

interface IFormProps {
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

function Form({inputValue, onInputChange, onSubmit}: IFormProps) {

    return (
        <div className="form_root">
            <input className="form_input" placeholder={"Insert github username"} onChange={onInputChange} value={inputValue}/>
            <button className="form_button" onClick={onSubmit} disabled={!inputValue}>Submit</button>
        </div>
    );
}

export default Form;
