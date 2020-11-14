import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import SolutionPage from "./SolutionPage";
 
export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
                    <h1>Header</h1>
                    <form>
                        <fieldset>
                            <label>
                                <p>Enter your expression</p>
                                <input expr="expression" />
                            </label>
                        </fieldset>
                    </form>
                </div>);
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);