import React from "react";
import "./display.css";

const display = props => 
    <div className="display">
        <span className="display-text">
            {props.value}
        </span>
    </div>


export default display;