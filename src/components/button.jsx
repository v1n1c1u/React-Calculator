import React from "react";
import './button.css';

const btn = props =>
    <button
        className={props.buttonClass}
        id={props.id}
        onClick={e => props.click && props.click(props.value)}
        >
            {props.label}
    </button>

export default btn