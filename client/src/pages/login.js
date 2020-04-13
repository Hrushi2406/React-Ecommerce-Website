import React, { Component } from 'react'
import { TextField, withStyles, Button, Typography, Icon, InputAdornment, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import api from '../redux/actions/apiCreate'

import { loginUser } from "../redux/actions/userAction";
import { connect } from 'react-redux';

const styles = (theme) => ({
    container: theme.props.container,
    textField: theme.props.textField,
    button: theme.props.button1,
})

export class login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        errors: {},
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
    }


    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state
        return (
            <div className="paddedContainer">

                <div className={classes.container}>
                    <Typography gutterBottom variant='h4'> Login </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField
                            id="standard-basic-1"
                            variant="outlined"
                            label="Email"
                            margin="dense"
                            name="email"
                            type='email'
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <TextField
                            id="standard-basic-2"
                            variant="outlined"
                            margin="dense"
                            size='medium'
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <Button
                            type='submit'
                            variant="contained"
                            color='primary'
                            className={classes.button}
                            fullWidth >
                            {loading ? <CircularProgress color='inherit' /> : "Login"}
                        </Button>
                    </form>


                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    ui: state.ui
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(login))