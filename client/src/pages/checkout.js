import React, { Component } from 'react'
import { Stepper, Step, StepLabel, withStyles, Typography, Button, Paper, useTheme, useMediaQuery, Grid, Divider, Icon, CircularProgress, Snackbar, SnackbarContent } from '@material-ui/core'

import BagItem from '../components/bagItem'
import { Link } from 'react-router-dom';
import SummaryStep from "../components/summaryStep";
import AddressStep from "../components/addressStep"
import PaymentStep from "../components/paymentStep"
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/checkoutAction'

import { getTotalPrice, getTotalDiscountPrice, getYouPay, TransitionUp } from '../utils/functions'
import { clearErrors } from '../redux/actions/uiAction'
import { updateDefaultAddress } from '../redux/actions/checkoutAction'

const styles = theme => ({
    center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 500
    },
    headerTitle: {
        fontSize: '1.15rem',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    divider: {
        marginTop: 5,
        marginBottom: 5,
    },
    divider2: {
        marginTop: 5,
        marginBottom: 15,
    },
    price: {
        fontSize: 18,
        fontWeight: 600
    },
    buttonDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: '0.9rem',
        marginBottom: 10,
        fontWeight: 600,
    },
    title: {
        fontSize: '1.15rem'
    },
})

function getSteps() {
    return ['Summary ', 'Delivery Address', 'Payment Methods'];
}


export class checkout extends Component {
    state = {
        activeStep: 0,
        selectedAddress: null,
        selectedPaymentMethod: null
    }
    setSelectedAddress = (i) => this.setState({ selectedAddress: i })
    setPaymentMethod = (val) => this.setState({ selectedPaymentMethod: val })

    componentDidMount() {
        this.props.fetchProducts()
        this.setState({ selectedAddress: this.props.userData.defaultAddress })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedAddress: this.props.userData.defaultAddress
        })
    }
    updateDefaultAddress = () => {
        this.props.updateDefaultAddress(this.state.selectedAddress)
        this.handleNext()
    }
    placeOrder = () => {

    }

    handleClose = () => {
        this.props.clearErrors();
    }
    handleReset = () => this.setState({ activeStep: 0 })
    handleBack = () => this.setState({ activeStep: this.state.activeStep - 1 })
    handleNext = () => this.setState({ activeStep: this.state.activeStep + 1 })

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <SummaryStep />;
            case 1:
                return <AddressStep selectedAddress={this.state.selectedAddress} onDefaultAddressChange={this.setSelectedAddress} />;
            case 2:
                return <PaymentStep selectedPaymentMethod={this.state.selectedPaymentMethod} setPaymentMethod={this.setPaymentMethod} />;
            default:
                return 'Unknown stepIndex';
        }
    }


    render() {
        const { classes, checkoutProducts, userData: { defaultAddress, addressList }, ui: { loading, errors, success } } = this.props
        const { activeStep, selectedPaymentMethod } = this.state
        const steps = getSteps()

        return (
            < React.Fragment >
                <Stepper activeStep={activeStep} className="stepper" style={{ backgroundColor: "rgba(0, 0, 0, 0.03)", }} alternativeLabel>
                    {
                        steps.map(label => {
                            return <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        })
                    }
                </Stepper>

                <div className='contentDiv' style={{ transition: '0.5s' }} >
                    {
                        loading ? <div className={classes.center}><CircularProgress /> </div> :

                            activeStep === steps.length ? (
                                <div>
                                    <div className={classes.center}>
                                        <Typography variant='h4' className={classes.headerTitle}> You Order has been placed Succesfully</Typography>
                                        <Button component={Link} to='/viewOrders' color='secondary' >View your Orders</Button>
                                    </div>
                                </div>
                            ) : (
                                    <div className='contentDiv' style={{ padding: 0, marginTop: 0, background: 'transparent', boxShadow: 'none' }}>
                                        {/* SUMMARY */}
                                        {
                                            activeStep !== 1 ? <React.Fragment>
                                                <div className={classes.container}>
                                                    <Typography variant='h4' color='primary' className={classes.title} >Summary</Typography>
                                                    <Button
                                                        component={Link}
                                                        to='/bag'
                                                        color='secondary'
                                                        size='small'>
                                                        Edit Bag
                                                      </Button>
                                                </div>
                                                <Divider className={classes.divider2} />
                                                <div>
                                                    <div className="summaryHeader">
                                                        <div className={classes.container}>
                                                            <Typography gutterBottom variant='body2'>Total Price ({checkoutProducts.length} items)</Typography>
                                                            <Typography variant='body2' >Rs. {getTotalPrice(checkoutProducts)}</Typography>
                                                        </div>
                                                        <div className={classes.container}>
                                                            <Typography gutterBottom variant='body2'>Item Discount ({checkoutProducts.length} items)</Typography>
                                                            <Typography variant='body2'> - Rs. {getTotalDiscountPrice(checkoutProducts)}</Typography>
                                                        </div>
                                                        <Divider className={classes.divider} />
                                                        <div className={classes.container}>
                                                            <Typography color='primary' variant='h4' className={classes.headerTitle} >You Pay</Typography>
                                                            <Typography color='primary' variant='h4' className={classes.headerTitle} > Rs. {getYouPay(checkoutProducts)}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                                : <React.Fragment></React.Fragment>
                                        }
                                        {/* Address */}
                                        {
                                            activeStep === 2 ? <React.Fragment>
                                                <div className={classes.container}>
                                                    <Typography variant='h4' color='primary' className={classes.title} >Selected Address for Delivery</Typography>
                                                    <Button
                                                        color='secondary'
                                                        onClick={this.handleBack}
                                                        size='small'>
                                                        Change address
                                         </Button>
                                                </div>
                                                <Divider className={classes.divider2} />
                                                <div>
                                                    <div className="summaryHeader" >
                                                        <Typography>{addressList[defaultAddress]}</Typography>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                                : <React.Fragment></React.Fragment>
                                        }

                                        <Snackbar
                                            open={errors !== null || success !== null}
                                            autoHideDuration={1200}
                                            onClose={this.handleClose}
                                            TransitionComponent={TransitionUp}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                            <SnackbarContent elevation={0} className={classes.snackbar} message={errors !== null ? errors : success} />
                                        </Snackbar>

                                        {this.getStepContent(activeStep)}
                                        <div className={classes.buttonDiv}>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.backButton}
                                                fullWidth >
                                                Back
                                        </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={activeStep === 1 ? defaultAddress === null ? true : false : false}
                                                onClick={activeStep === 1 ? this.updateDefaultAddress : activeStep === 2 ? this.placeOrder : this.handleNext}
                                                disabled={activeStep === steps.length - 1 ? selectedPaymentMethod === null : false}
                                                disableElevation
                                                fullWidth >
                                                {activeStep === steps.length - 1 ? selectedPaymentMethod === 'paypal' ? 'Pay and Place order' : 'Place order' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>

                                )
                    }
                </div>

            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return { userData: state.user.userData, checkoutProducts: state.checkout.products, ui: state.ui };
}


export default connect(mapStateToProps, { fetchProducts, clearErrors, updateDefaultAddress })(withStyles(styles)(checkout))
