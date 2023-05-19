import React, {Component} from "react";
import './calculatorStyles.css';
import Button from "../components/button";
import Display from "../components/display";
import Snackbars from "../components/snackbar";
import { publish } from "../events";

const initialState = {
    displayValue: '0',
    clearDisplay:false,
    start:true,
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
        this.equalsTo = this.equalsTo.bind(this);

    }

    clearMemory(){
        this.setState({...initialState});
    }
    backspace(){
        var displayValue = this.state.displayValue;
        var values = this.state.values;
        var history = this.state.history;
        if(displayValue.length === 0 && this.isOperator(values[values.length-1])){
            displayValue = values.shift();
            values.pop();
            history = '';
        }else{
            displayValue = (displayValue+"").slice(0,displayValue.length-1);
        }
        this.setState({displayValue, values, history});
    }
    isOperator(val){
        const operators = ["+","-","/","*","%"];
        return operators.includes(val);
    }
    setOperation(op){
        var values = this.state.values;
        var displayValue = this.state.displayValue + "";
        if(displayValue.indexOf('.') === displayValue.length-1){
            publish("calculationError", {message:"Invalid expression!"})
            console.log("Error: Invalid Expression");
            return;
        }
        values.push(parseFloat(displayValue));
        this.setState({values});
        const partialSolution = this.calculatePartialSolution();
        if(partialSolution !== 'undefined'){
            console.log("here");
            values = [];
            values.push(parseFloat(partialSolution));
            values.push(op);
            displayValue = '';
            var history = this.state.history;
            history = partialSolution + " " + op;
            this.setState({displayValue,history,values});
        }


    }
    addDigit(digit){
        var displayValue = this.state.displayValue;
        if(digit === '.' && displayValue.includes('.')){
            publish("calculationError", {message:"Invalid expression!"})
            console.log("Error: Invalid Expression");
        }else{
            if(displayValue === '0' && digit !== '.'){
                displayValue = '';
            }
            displayValue+=digit;
            this.setState({displayValue, clearDisplay:false});
        }

    }

    calculatePartialSolution(){
        let displayValue = this.state.displayValue;
        let partialSolution = displayValue;
        let values = this.state.values;
        let history = this.state.history;
        console.log(values);
        if(values.length === 3){
            partialSolution = parseFloat(this.calculate(values[0],values[1],values[2]));
            if(Math.abs(partialSolution) === Infinity || isNaN(partialSolution)){
                values.pop();
                this.setState({displayValue,values,history});
                publish('calculationError', {message:"Cannot divide by zero!"});
                return;
            }
        }
        return partialSolution;
    }
    equalsTo() {
        let displayValue = this.state.displayValue;
        let values = this.state.values;
        let history = this.state.history;
        if(values.length===0 && displayValue.length > 0){
            history = displayValue + " = ";
            this.setState({displayValue,values,history});
            return;
        }else{
            if(displayValue.length===0){
                publish("calculationError", {message:"Invalid expression!"})
                console.log("Error: Invalid Expression");
            }
            values.push(parseFloat(displayValue));
            history += displayValue + " = ";
            displayValue = this.calculatePartialSolution();
            if(displayValue !== 'undefined'){
                values = [displayValue];
            }else {
                publish("calculationError", {message:"Invalid expression!"})
            }
        }
        this.setState({displayValue,values,history});
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
                        <Button buttonClass="operator" label="=" click={()=> this.equalsTo()}/>
                    </div>    
                </div>
            </React.Fragment>
        )
    }
}