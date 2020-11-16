import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import SolutionPage from "./SolutionPage";
import Axios from "axios";
 
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {expression: '', derivative: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({expression: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.state.expression
        console.log(data)
        Axios.post('http://127.0.0.1:8000/api/get-derivative/', {
            expression: data
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

        alert('Submitted.');
    }

    render() {
        return (<div>
                    <h1>Headers</h1>
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <label>
                                <p>Enter your expression</p>
                                <input type='text' onChange={this.handleChange} />
                            </label>
                        </fieldset>
                        <input type="submit" value="Calculate" />
                    </form>
                    <p>{this.state.derivative}</p>
                </div>);
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);