import React, {Component} from "react";
import './calculatorStyles.css';
import Button from "../components/button";
import Display from "../components/display"

const initialState = {
    displayValue: '0',
    clearDisplay:false,
    operation: null,
    values: [],
    current: 0,
    history: ''
}

export default class Calculator extends Component {

    state = {...initialState};

    constructor(props){
        super(props);
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.backspace = this.backspace.bind(this);
        this.calculate = this.calculate.bind(this);
        this.calculatePartialSolution = this.calculatePartialSolution.bind(this);
    }

    clearMemory(){
        this.setState({...initialState});
    }
    backspace(){
        if(this.state.displayValue !=='0'){
            const currentDisplayValue = this.state.displayValue;
            let displayValue = currentDisplayValue.slice(0,currentDisplayValue.length-1);
            if(displayValue===''){
                displayValue='0';
            }
            this.setState({displayValue});
        }
    }
    setOperation(op){
        let displayValue = this.state.displayValue;
        if(displayValue.length=== 0){
            console.log("invalid expression");
            return;
        }
        this.calculatePartialSolution(op);        
    }
    addDigit(digit){
        if(digit === '.' && this.state.displayValue.includes('.')){
            return;
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
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
        console.log(values);
        if(values.length === 3){
            partialSolution = parseFloat(this.calculate(values[0],values[1],values[2]));
            if(Math.abs(partialSolution) === Infinity || isNaN(partialSolution)){
                values.pop();
                console.log("CANNOT DIVIDE BY ZERO!");
                return false;
            }
            if(op==='='){
                history = values[0] +' '+ values[1] + ' ' + values[2] + ' =';
                values = [];
                displayValue = partialSolution;
            }else{
                values = [];
                values.push(parseFloat(partialSolution));
                values.push(op);
                displayValue = '0';
                history = partialSolution +' '+ op;
            }
        }else{
            if(op === '='){
                console.log("INVALID EXPRESSION!");
                return false;
            }
            values.push(op);
            history = displayValue +' '+ op;
            displayValue = '0';
        }
        this.setState({displayValue,values, history});
        return true;
    }
    render() {
        //const addDigit = n => this.addDigit(n);
        //const setOperation = op => this.setOperation(op);
        return (
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
                    <Button buttonClass="number" id="zero-button" label="0" click={()=> this.addDigit(0)}/>
                    <Button buttonClass="number" label="." click={()=> this.addDigit(".")}/>
                    <Button buttonClass="operator" label="=" click={()=> this.setOperation("=")}/>
                </div>    
            </div>
        )
    }
}