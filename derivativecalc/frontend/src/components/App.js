import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import { render } from "react-dom";
 
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {f: '', derivative: 'Your derivative will appear here'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setDerivative(data) {
        console.log(data)
        this.setState({derivative: data.derivative});
    }

    handleChange(event) {
        this.setState({f: event.target.value});
    }

    handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                f: this.state.f
            }),
        };
        const self = this;
        fetch('/api/get-derivative', requestOptions).then((response) =>
            response.json()
        ).then((data) => self.setDerivative(data));


    }

    render() {
       return <Grid container spacing={2}>
                <Grid item xs={12} align="center">
                    <Typography component="h4" variant="h4">
                        Derivative Calculator
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                            <TextField required="true" 
                                    type="string" 
                                    defaultValue={""}
                                    inputProps={{
                                        style: { textAlign: "center"}
                                    }}
                                    onChange={this.handleChange}>
                            </TextField>
                            <FormHelperText>
                                <div align="center">
                                    Enter your expression
                                </div>
                            </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Typography component="h6" variant="h6">
                        {this.state.derivative}
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" 
                            variant="contained" 
                            onClick={this.handleSubmit}>Calculate!</Button>
                </Grid>
              </Grid>;
    }
}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);