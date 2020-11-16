import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import SolutionPage from "./SolutionPage";
import Axios from "axios";
 
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {expression: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({expression: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        //const data = new FormData(event.target);
        /*
        const form = event.target;
        const data = {};
        for (let i=0; i < form.elements.length; i++) {
            const elem = form.elements[i];
            data[elem.name] = elem.value
        }
        */
        const data = this.state.expression
        console.log(data)

        fetch('/api/get-derivative/', {
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-type':'application/json',
            },
            body: data,
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
                        <input type="submit" value="Calculatex" />
                    </form>
                </div>);
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);