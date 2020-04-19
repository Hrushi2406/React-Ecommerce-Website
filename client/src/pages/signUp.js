import React, { Component } from 'react'
import { TextField, withStyles, Button, Typography, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { signUpUser } from "../redux/actions/userAction";
import { Link } from 'react-router-dom';

// import DateFnsUtils from '@date-io/date-fns';

const styles = (theme) => ({
    container: theme.props.container,
    textField: theme.props.textField,
    button: theme.props.button1,
    linkButton: theme.props.linkButton

})

export class signUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        mobile: null,
        errors: {},
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            mobile: this.state.mobile,
            dob: this.state.dob
        }
        this.props.signUpUser(userData, this.props.history)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDateChange = (date) => {
        this.setState({
            dob: date
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors })
        }
    }
    render() {
        const { classes, ui: { loading } } = this.props;
        const { errors } = this.state;
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
                            helperText={errors.name}
                            error={errors.name ? true : false}
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
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <TextField
                            id="standard-basic-1"
                            label="Mobile No."
                            name="mobile"
                            type='number'
                            variant="outlined"
                            margin="dense"
                            helperText={errors.mobile}
                            error={errors.mobile ? true : false}
                            value={this.state.mobile}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <TextField
                            id="date"
                            label="Date of Birth"
                            name='dob'
                            type="date"
                            variant="outlined"
                            helperText={errors.dob}
                            error={errors.dob ? true : false}
                            onChange={this.handleChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                        <TextField
                            id="standard-basic-2"
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="dense"
                            autoComplete="current-password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
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
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />

                        <Button
                            type='submit'
                            variant="contained"
                            color='primary'
                            className={classes.button}
                            fullWidth >
                            {loading ? <CircularProgress color='inherit' /> : "Sign Up"}
                        </Button>
                        <Typography color='secondary' to='/login' component={Link} className={classes.linkButton} >Have an account? Login</Typography>

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

export default connect(mapStateToProps, { signUpUser })(withStyles(styles)(signUp))
