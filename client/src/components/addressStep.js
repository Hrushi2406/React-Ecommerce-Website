import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, withStyles, Button, Icon, Divider, TextField } from '@material-ui/core'


const styles = theme => ({
    title: {
        fontSize: '1.15rem'
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    divider: {
        marginTop: 5,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: '0.9rem',
        marginBottom: 10,
        fontWeight: 600,
    },
    textField: {
        marginRight: 10,
    }

})



class addressStep extends Component {
    state = {
        selectedAddress: 0,
        showForm: false,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        pincode: null
    }
    setSelectedAddress = (i) => this.setState({ selectedAddress: i })

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showForm = () => this.setState({ showForm: true })
    hideForm = () => this.setState({ showForm: false })

    render() {
        const { classes, ui: { errors } } = this.props
        const { selectedAddress, showForm } = this.state
        var address = [" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima laudantium nam sapiente enim quae in ullam vitae voluptatibus, sit dolore unde illo veniam maiores? Fugiat cum nostrum vitae delectus obcaecati?", " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima laudantium nam sapiente enim quae in ullam vitae voluptatibus, sit dolore unde illo veniam maiores? Fugiat cum nostrum vitae delectus obcaecati?"]
        return (
            <React.Fragment >
                <div className={classes.container}>
                    <Typography variant='h4' color='primary' className={classes.title} >Select Delivery Address</Typography>
                    <Button
                        onClick={this.showForm}
                        color='secondary'
                        size='small'>
                        Add address
                    </Button>
                </div>
                <Divider className={classes.divider} />
                <div>
                    <Typography variant='body1' className={classes.subtitle} >Select from saved Address </Typography>
                    {
                        address.map((add, i) => {
                            return <div key={i} className="summaryHeader" onClick={() => this.setSelectedAddress(i)} style={selectedAddress === i ? { transition: '0.2s', background: '#bbbbbb', color: '#fff' } : {}}>
                                <Typography>{add}</Typography>
                            </div>
                        })
                    }
                </div>



                {showForm ?
                    <div>
                        <Typography variant='body1' className={classes.subtitle} >Add address </Typography>
                        <TextField
                            id="standard-basic-1"
                            variant="outlined"
                            label="Address Line 1"
                            margin="dense"
                            name="addressLine1"
                            type='text'
                            helperText={errors}
                            error={errors ? true : false}
                            value={this.state.addressLine1}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <TextField
                            id="standard-basic-2"
                            variant="outlined"
                            label="Address Line 2"
                            margin="dense"
                            name="addressLine2"
                            type='text'
                            helperText={errors}
                            error={errors ? true : false}
                            value={this.state.addressLine2}
                            onChange={this.handleChange}
                            className={classes.textField}
                            fullWidth />
                        <div className={classes.container}>
                            <TextField
                                id="standard-basic-3"
                                variant="outlined"
                                label="Pincode"
                                margin="dense"
                                name="pincode"
                                type='number'
                                helperText={errors}
                                error={errors ? true : false}
                                value={this.state.pincode}
                                onChange={this.handleChange}
                                className={classes.textField}
                                fullWidth />
                            <TextField
                                id="standard-basic-4"
                                variant="outlined"
                                label="City"
                                margin="dense"
                                name="city"
                                type='text'
                                helperText={errors}
                                error={errors ? true : false}
                                value={this.state.city}
                                onChange={this.handleChange}
                                className={classes.textField}
                                fullWidth />
                        </div>
                        <div className={classes.container}>
                            <TextField
                                id="standard-basic-5"
                                variant="outlined"
                                label="State"
                                margin="dense"
                                name="state"
                                type='text'
                                helperText={errors}
                                error={errors ? true : false}
                                value={this.state.state}
                                onChange={this.handleChange}
                                className={classes.textField}
                                fullWidth />
                            <TextField
                                id="standard-basic-6"
                                variant="outlined"
                                label="Country"
                                margin="dense"
                                name="country"
                                type='text'
                                helperText={errors}
                                error={errors ? true : false}
                                value={this.state.country}
                                onChange={this.handleChange}
                                className={classes.textField}
                                fullWidth />
                        </div>
                        <div className={classes.container}>
                            <Button
                                onClick={this.hideForm}
                                fullWidth >
                                Close address Form
                            </Button>
                            <Button
                                color='primary'
                                variant='outlined'
                                disableElevation
                                fullWidth >
                                Save Address</Button>
                        </div>
                    </div>
                    :
                    <React.Fragment></React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return { ui: state.ui }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(addressStep))
