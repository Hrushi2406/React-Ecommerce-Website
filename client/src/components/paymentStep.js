import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Typography, Button, Divider, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'


const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    divider2: {
        marginTop: 5,
        marginBottom: 15,
    },
    title: {
        fontSize: '1.15rem'
    },
})


const PaymentStep = ({ classes, selectedPaymentMethod, setPaymentMethod }) => {
    return (
        <React.Fragment>
            <div className={classes.container}>
                <Typography variant='h4' color='primary' className={classes.title} >Select Payment Method</Typography>
            </div>
            <Divider className={classes.divider2} />
            <div>
                <div className="summaryHeader" >
                    <RadioGroup aria-label="paymentMehtod" name="paymentMethod" value={selectedPaymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <FormControlLabel value="paypal" control={<Radio />} label="Pay with Paypal" />
                        <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                    </RadioGroup>
                </div>
            </div>
        </React.Fragment >
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaymentStep))
