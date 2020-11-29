import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import styled from "styled-components";
import Page from "./Page";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { render } from "react-dom";
 
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {f: '', derivative: 'Your derivative will appear here'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setDerivative(data) {
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

    useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(20),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },

      }));


    render() {
        const classes = this.useStyles;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                    <div className={classes.paper} >
                        <Typography component="h1" variant="h5" align="center">
                        Derivative Calculator
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Expression"
                            label="Expression"
                            name="Expression"
                            autoComplete="Expression"
                            autoFocus
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="filled-helperText"
                            variant="outlined"
                            margin="normal"
                            value={this.state.derivative}
                            fullWidth
                            name="Derivative"
                            label="Derivative"
                            type="Derivative"
                            id="Derivative"
                            autoComplete="current-Derivative"
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Calculate
                        </Button>
                    </div>
            </Container>
        );
    }

}

const appDiv = document.getElementById("app");
render(<App/>, appDiv);