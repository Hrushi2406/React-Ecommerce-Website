import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography, withStyles, Button, Icon, Divider, TextField } from '@material-ui/core'

import { saveAddress, deleteAddress } from '../redux/actions/checkoutAction'

const styles = theme => ({
    title: {
        fontSize: '1.15rem'
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: "rgba(0,0,0,0.03)",
        borderRadius: 10,
        height: 300,
        marginBottom: 15
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
        showForm: false,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        errors: {},
    }
    setSelectedAddress = (i) => this.props.onDefaultAddressChange(i)

    componentDidMount() {
        this.setState({
            selectedAddress: this.props.selectedAddress
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedAddress: this.props.selectedAddress
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveAddress = () => {
        const { addressLine1, addressLine2, city, state, country, pincode } = this.state
        let userAdrress = addressLine1 + " " + addressLine2 + " " + city + " " + state + " " + country + " " + pincode
        console.log(userAdrress)
        this.props.saveAddress(userAdrress)
    }

    deleteAddress = () => {
        this.props.deleteAddress(this.props.selectedAddress)
    }

    showForm = () => this.setState({ showForm: true })
    hideForm = () => this.setState({ showForm: false })

    render() {
        const { classes, userData: { addressList }, ui, selectedAddress } = this.props
        const { showForm, errors } = this.state

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
                {
                    addressList === null ? <div className={classes.center}>
                        <Typography variant='h4' gutterBottom color='primary' className={classes.title} >You don't have any saved address</Typography>
                        <Typography variant='body2' color='secondary'  >Click Add address to add one</Typography>
                    </div>
                        : <div >
                            <div className={classes.container}>
                                <Typography variant='body1' className={classes.subtitle} >Select from saved Address </Typography>
                                <Button size='small' color='secondary' onClick={this.deleteAddress} className={classes.subtitle} >Delete selected address</Button>
                            </div>

                            {
                                addressList.map((add, i) => {
                                    return <div key={i} className="summaryHeader" onClick={() => this.setSelectedAddress(i)} style={selectedAddress === i ? { transition: '0.2s', background: '#bbbbbb', color: '#fff' } : {}}>
                                        <Typography variant='body1' >{add}</Typography>
                                    </div>
                                })
                            }
                        </div>
                }

                {showForm ?
                    <div >
                        <Typography variant='body1' className={classes.subtitle} >Add address </Typography>
                        <TextField
                            id="standard-basic-1"
                            variant="outlined"
                            label="Address Line 1"
                            margin="dense"
                            name="addressLine1"
                            type='text'
                            helperText={errors.addressLine1}
                            error={errors.addressLine1 ? true : false}
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
                            helperText={errors.addressLine2}
                            error={errors.addressLine2 ? true : false}
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
                                helperText={errors.pincode}
                                error={errors.pincode ? true : false}
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
                                helperText={errors.city}
                                error={errors.city ? true : false}
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
                                helperText={errors.state}
                                error={errors.state ? true : false}
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
                                required={true}
                                helperText={errors.country}
                                error={errors.country ? true : false}
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
                                onClick={this.saveAddress}
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
    return { checkoutProducts: state.checkout.products, userData: state.user.userData, ui: state.ui }
}

export default connect(mapStateToProps, { saveAddress, deleteAddress })(withStyles(styles)(addressStep))
