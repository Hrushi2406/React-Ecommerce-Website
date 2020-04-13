import React, { Component } from 'react'
import { TextField, withStyles, Button, Typography } from '@material-ui/core'


const styles = (theme) => ({
    container: theme.props.container,
    textField: theme.props.textField,
    button: theme.props.button1,
})

export class signUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {},
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/')
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="paddedContainer">

                <div className={classes.container}>
                    <Typography gutterBottom variant='h4'> Sign Up </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="standard-basic-1"
                            label="Name"
                            name="name"
                            type='text'
                            variant="outlined"
                            margin="dense"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <TextField
                            id="standard-basic-1"
                            label="Email"
                            name="email"
                            type='email'
                            variant="outlined"
                            margin="dense"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <TextField
                            id="standard-basic-2"
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <TextField
                            id="standard-basic-2"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />

                        <Button type='submit' fullWidth variant="contained" color='primary' className={classes.button}>Sign Up</Button>
                    </form>


                </div>

            </div>
        )
    }
}

export default withStyles(styles)(signUp)
