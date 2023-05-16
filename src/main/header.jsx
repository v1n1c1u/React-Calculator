import React, { Component } from "react";
import './headerStyles.css';
import logo from "../logo-cropped.svg";

export default class Header extends Component {
    render(){
        return (
            <header className="App-header ">
                <h1>Calculat</h1>
                <div className="logo-container">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>
                <h1>r</h1>
            </header>
        );
    }
}