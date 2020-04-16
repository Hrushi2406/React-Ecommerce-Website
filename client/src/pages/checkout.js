import React, { Component } from 'react'
import { Stepper, Step, StepLabel, withStyles, Typography, Button, Paper, useTheme, useMediaQuery, Grid, Divider, Icon } from '@material-ui/core'

import BagItem from '../components/bagItem'
import { Link } from 'react-router-dom';
import SummaryStep from "../components/summaryStep";
import AddressStep from "../components/addressStep"
import PaymentStep from "../components/paymentStep"


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

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <SummaryStep />;
        case 1:
            return <AddressStep />;
        case 2:
            return <PaymentStep />;
        default:
            return 'Unknown stepIndex';
    }
}

export class checkout extends Component {
    state = {
        activeStep: 0
    }

    handleReset = () => this.setState({ activeStep: 0 })
    handleBack = () => this.setState({ activeStep: this.state.activeStep - 1 })
    handleNext = () => this.setState({ activeStep: this.state.activeStep + 1 })

    render() {
        const { classes } = this.props
        const { activeStep } = this.state
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

                <div className='contentDiv'>
                    {
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
                                                    color='secondary'
                                                    size='small'>
                                                    Edit Bag
                                         </Button>
                                            </div>
                                            <Divider className={classes.divider2} />
                                            <div>
                                                <div className="summaryHeader">
                                                    <div className={classes.container}>
                                                        <Typography gutterBottom variant='body2'>Total Price (5 items)</Typography>
                                                        <Typography variant='body2' >Rs. 18000</Typography>
                                                    </div>
                                                    <div className={classes.container}>
                                                        <Typography gutterBottom variant='body2'>Item Discount (2 items)</Typography>
                                                        <Typography variant='body2'>Rs. 18000</Typography>
                                                    </div>
                                                    <Divider className={classes.divider} />
                                                    <div className={classes.container}>
                                                        <Typography color='primary' variant='h4' className={classes.headerTitle} >You Pay</Typography>
                                                        <Typography color='primary' variant='h4' className={classes.headerTitle} > Rs. 18000</Typography>
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
                                                    size='small'>
                                                    Change address
                                         </Button>
                                            </div>
                                            <Divider className={classes.divider2} />
                                            <div>
                                                <div className="summaryHeader" >
                                                    <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem minima recusandae harum deleniti perspiciatis labore, distinctio cum voluptates sed ullam illum ratione velit ex laudantium perferendis ea veniam ad libero.</Typography>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                            : <React.Fragment></React.Fragment>
                                    }

                                    {
                                        activeStep === 2 ? <React.Fragment>
                                            <div className={classes.container}>
                                                <Typography variant='h4' color='primary' className={classes.title} >Select Payment Method</Typography>
                                                <Button
                                                    color='secondary'
                                                    size='small'>
                                                    Change address
                                         </Button>
                                            </div>
                                            <Divider className={classes.divider2} />
                                            <div>
                                                <div className="summaryHeader" >
                                                    <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem minima recusandae harum deleniti perspiciatis labore, distinctio cum voluptates sed ullam illum ratione velit ex laudantium perferendis ea veniam ad libero.</Typography>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                            : <React.Fragment></React.Fragment>
                                    }



                                    {getStepContent(activeStep)}
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
                                            onClick={this.handleNext}
                                            disableElevation
                                            fullWidth >
                                            {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
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

export default withStyles(styles)(checkout)
