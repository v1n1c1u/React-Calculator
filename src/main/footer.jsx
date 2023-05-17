import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const footer = () => {
    return (
    <footer>
        Vinícius Souza © 2023
        <ul>
            <li>
                <a href="https://github.com/v1n1c1u" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faGithub} className="icon"/>
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/vin%C3%ADcius-souza-a108a6201/" target="_blank" rel="noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className="icon"/>
                </a>
            </li>
        </ul>
    </footer>
    )
}

export default footer;