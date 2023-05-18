import React, {Component} from "react";
import './calculatorStyles.css';
import Button from "../components/button";
import Display from "../components/display";
import Snackbars from "../components/snackbar";
import { publish } from "../events";

const initialState = {
    displayValue: '0',
    clearDisplay:false,
    operation: null,
    values: [],
    current: 0,
    history: '',
    error: ''
}

export default class Calculator extends Component {

    state = {...initialState};
    event = new CustomEvent('calculationError', {message: "An error ocurred!"});

    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.backspace = this.backspace.bind(this);
        this.calculate = this.calculate.bind(this);
        this.calculatePartialSolution = this.calculatePartialSolution.bind(this);
        this.isOperator = this.isOperator.bind(this);
    }

    clearMemory(){
        this.setState({...initialState});
    }
    backspace(){
        if(this.state.displayValue !=='0'){
            const currentDisplayValue = this.state.displayValue;
            let displayValue = currentDisplayValue.slice(0,currentDisplayValue.length-1);
            this.setState({displayValue});
        }
    }
    isOperator(val){
        const operators = ["+","-","/","*","%"];
        return operators.includes(val);
    }
    setOperation(op){
        const values = this.state.values;
        console.log(values);
        if(values.length>10 && this.isOperator(values[values.length-1])){
            publish("calculationError", {message:"Invalid expression!"})
            console.log("Error: Invalid Expression");
            return;
        }
        this.calculatePartialSolution(op);        
    }
    addDigit(digit){
        if(digit === '.' && this.state.displayValue.includes('.')){
            publish("calculationError", {message:"Invalid expression!"})
            return;
        }
        const clearDisplay = (this.state.displayValue === '0' && digit !== '.' )|| this.state.clearDisplay;
        const currentValue = clearDisplay ? '':this.state.displayValue;
        const displayValue = currentValue + digit;
        this.setState({displayValue, clearDisplay:false});

    }
    calculate(num1, op, num2){
        let result = 0;
        switch(op){
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            case "%":
                result = num1 % num2;
                break;
            default:
                publish("calculationError", {message:`Unknown error while operating ${num1}, ${op}, ${num2}`});
                console.log(`ERROR: Unknown error while operating ${num1}, ${op}, ${num2}`);
        }
        if(result !== Math.floor(result)){
            result = parseFloat(result).toFixed(4);
        }
        return result;
    }
    calculatePartialSolution(op){
        let displayValue = this.state.displayValue;
        let partialSolution;
        let values = this.state.values;
        let history = this.state.history;
        values.push(parseFloat(displayValue));
        if(values.length === 3){
            partialSolution = parseFloat(this.calculate(values[0],values[1],values[2]));
            if(Math.abs(partialSolution) === Infinity || isNaN(partialSolution)){
                values.pop();
                publish('calculationError', {message:"Cannot divide by zero!"});
                return;
            }
            values = [];
            if(op==='='){
                history = values[0] +' '+ values[1] + ' ' + values[2] + ' =';
                displayValue = partialSolution;
            }else{
                values.push(parseFloat(partialSolution));
                values.push(op);
                displayValue = '';
                history = partialSolution +' '+ op;
            }
        }else{
            if(op === '='){
                publish("calculationError", {message:"Invalid expression!"})
                console.log("INVALID EXPRESSION!");
                return;
            }
            values.push(op);
            history = displayValue +' '+ op;
            displayValue = '';
        }
        this.setState({displayValue,values, history});
        return true;
    }
    render() {
        return (
            <React.Fragment>
                <Snackbars message={this.state.error}/>
                <div className="calculator">
                    <Display value={this.state.displayValue} history={this.state.history}/>
                    <div id="keyboard">
                        <Button buttonClass="special"label="AC" click={()=> this.clearMemory()}/>
                        <Button buttonClass="special" label="C" click={()=> this.backspace()}/>
                        <Button buttonClass="special" label="%" click={()=> this.setOperation("%")}/>
                        <Button buttonClass="operator" label="÷" click={()=> this.setOperation("/")}/>
                        <Button buttonClass="number" label="7" click={()=> this.addDigit(7)}/>
                        <Button buttonClass="number" label="8" click={()=> this.addDigit(8)}/>
                        <Button buttonClass="number" label="9" click={()=> this.addDigit(9)}/>
                        <Button buttonClass="operator" label="×" click={()=> this.setOperation("*")}/>
                        <Button buttonClass="number"label="4" click={()=> this.addDigit(4)}/>
                        <Button buttonClass="number"label="5" click={()=> this.addDigit(5)}/>
                        <Button buttonClass="number"label="6" click={()=> this.addDigit(6)}/>
                        <Button buttonClass="operator" label="-" click={()=> this.setOperation("-")}/>
                        <Button buttonClass="number" label="1" click={()=> this.addDigit(1)}/>
                        <Button buttonClass="number" label="2" click={()=> this.addDigit(2)}/>
                        <Button buttonClass="number" label="3" click={()=> this.addDigit(3)}/>
                        <Button buttonClass="operator" label="+" click={()=> this.setOperation("+")}/>
                        <Button buttonClass="number double-size" label="0" click={()=> this.addDigit(0)}/>
                        <Button buttonClass="number" label="." click={()=> this.addDigit(".")}/>
                        <Button buttonClass="operator" label="=" click={()=> this.setOperation("=")}/>
                    </div>    
                </div>
            </React.Fragment>
        )
    }
}