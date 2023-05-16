import React, {Component} from "react";
import './calculatorStyles.css';
import Button from "../components/button";
import Display from "../components/display"

export default class Calculator extends Component {

    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.backspace = this.backspace.bind(this);
    }

    clearMemory(){

    }
    backspace(){

    }
    setOperation(){

    }
    addDigit(num){

    }
    render() {
        const addDigit = n => this.addDigit(n);
        const setOperation = op => this.setOperation(op);
        return (
            <div className="calculator">
                <Display value="0"/>
                <div id="keyboard">
                    <Button buttonClass="special-button" value="Delete" label="AC" click={()=> this.clearMemory}/>
                    <Button buttonClass="special-button" value="Backspace" label="C" click={()=> this.backspace}>C</Button>
                    <Button buttonClass="special-button" value="%" label="%" click={()=> this.setOperation("%")}/>
                    <Button buttonClass="operator-button" value="/" label="÷" click={()=> this.setOperation("/")}/>
                    <Button buttonClass="number-button" value="7" label="7" click={()=> this.addDigit(7)}/>
                    <Button buttonClass="number-button" value="8" label="8" click={()=> this.addDigit(8)}/>
                    <Button buttonClass="number-button" value="9" label="9" click={()=> this.addDigit(9)}/>
                    <Button buttonClass="operator-button" value="*" label="×" click={()=> this.setOperation("*")}/>
                    <Button buttonClass="number-button" value="4" label="4" click={()=> this.addDigit(4)}/>
                    <Button buttonClass="number-button" value="5" label="5" click={()=> this.addDigit(5)}/>
                    <Button buttonClass="number-button" value="6" label="6" click={()=> this.addDigit(6)}/>
                    <Button buttonClass="operator-button" value="-" label="-" click={()=> this.setOperation("-")}/>
                    <Button buttonClass="number-button" value="1" label="1" click={()=> this.addDigit(1)}/>
                    <Button buttonClass="number-button" value="2" label="2" click={()=> this.addDigit(2)}/>
                    <Button buttonClass="number-button" value="3" label="3" click={()=> this.addDigit(3)}/>
                    <Button buttonClass="operator-button" value="+" label="+" click={()=> this.setOperation("+")}/>
                    <Button buttonClass="number-button" value="0" id="zero-button" label="0" click={()=> this.addDigit(0)}/>
                    <Button buttonClass="number-button" value="." id="dot" label="." click={()=> this.addDigit(".")}/>
                    <Button buttonClass="operator-button" value="Enter" label="=" click={()=> this.calculate()}/>
                </div>    
            </div>
        )
    }
}