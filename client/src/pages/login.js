import React, { Component } from 'react'
import { TextField, withStyles, Button, Typography } from '@material-ui/core'

const styles = (theme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-80%)',
        textAlign: "center",
    },
    textField: {
        margin: "10px 0"
    },
    button: {
        backgroundColor: '#404969',
        borderRadius: 10,
        marginTop: 20,
    }
})

export class login extends Component {
    state = {
        email: '',
        password: '',
        error: '',
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
            <div className={classes.container}>
                <Typography gutterBottom variant='h4'> Login </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        id="standard-basic"
                        label="Email"
                        name="email"
                        type='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        className={classes.textField}
                        fullWidth />
                    <TextField
                        id="standard-basic"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        className={classes.textField}
                        fullWidth />
                    <Button type='submit' fullWidth variant="contained" color='primary' className={classes.button}>Login</Button>
                </form>


            </div>
        )
    }
}

export default withStyles(styles)(login)