import React, { Component } from 'react'
import { Grid, Card, CardContent, Icon, Typography, withStyles, Divider, Button, Slide, Snackbar, SnackbarContent, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import Product from "../components/product";
import BagItem from '../components/bagItem';
import { Link } from 'react-router-dom';
import { clearBag } from '../redux/actions/cartAction'
import { clearErrors, clearSuccessMessage } from '../redux/actions/uiAction'
import { TransitionUp } from '../utils/functions'
import { mapProductsToUser } from '../redux/actions/checkoutAction'

import { getTotalPrice, getTotalDiscountPrice, getYouPay } from '../utils/functions'

const styles = theme => ({
    center: theme.props.center,
    snackbar: theme.props.snackbar,
    empty: {
        fontSize: 20
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        marginTop: 5,
        marginBottom: 20,
    },
    card: {
        backgroundColor: "rgba(0, 0, 0, 0.02)",
        paddingBottom: 0,
        borderRadius: 10,
        marginBottom: 10
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    bold: {
        fontWeight: "bold"
    },
    headerTitle: {
        fontSize: '1.25rem',
    },
})




class bag extends Component {
    handleClose = () => {
        this.props.clearErrors();
        this.props.clearSuccessMessage();
    }

    openCheckout = () => {
        this.props.mapProductsToUser(this.props.history)
    }

    render() {
        const { cartItems, classes, ui: { errors, success, loading } } = this.props

        if (cartItems.length == 0) return <div>
            <div className={classes.container}>
                <div></div>
                <Typography variant='h5'>BAG</Typography>
                <div></div>
                <Snackbar
                    open={errors !== null || success !== null}
                    autoHideDuration={1200}
                    onClose={this.handleClose}
                    TransitionComponent={TransitionUp}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <SnackbarContent elevation={0} className={classes.snackbar} message={errors !== null ? errors : success} />
                </Snackbar>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.center}>
                <Typography gutterBottom className={classes.empty} >Your Bag is Empty</Typography>
                <Typography component={Link} to="/" color='secondary' >Continue to Shopping </Typography>
            </div>
        </div>

        return (
            <div>
                <Snackbar
                    open={errors !== null || success !== null}
                    autoHideDuration={1200}
                    onClose={this.handleClose}
                    TransitionComponent={TransitionUp}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <SnackbarContent elevation={0} className={classes.snackbar} message={errors !== null ? errors : success} />
                </Snackbar>

                <div className={classes.container}>
                    <Button component={Link} to='/' color='primary'>Back to Shop</Button>
                    <Typography variant='h5'>BAG</Typography>
                    <Button color='secondary' onClick={() => this.props.clearBag()}>Clear Bag</Button>
                </div>
                <Divider className={classes.divider} />
                <Grid container spacing={2}>

                    <Grid item sm={8} xs={12} >
                        {cartItems.map(item => <BagItem item={item} key={item.productId} />)}
                    </Grid>

                    <Grid item sm={4} xs={12}>
                        <Card className={classes.card} elevation={0}>
                            <CardContent style={{ paddingBottom: 0 }}>
                                <Typography gutterBottom variant='h4' className={classes.headerTitle} color='primary'>Summary</Typography>
                                <Divider />
                                <div className={classes.details}>
                                    <Typography gutterBottom variant='body1' >Price ({cartItems.length} items)</Typography>
                                    <Typography gutterBottom variant='body1' >Rs. {getTotalPrice(cartItems)} </Typography>
                                </div>
                                <div className={classes.details}>
                                    <Typography gutterBottom variant='body1' >Item Discount</Typography>
                                    <Typography gutterBottom variant='body1' > - Rs. {getTotalDiscountPrice(cartItems)} </Typography>
                                </div>
                                <Divider />
                                <div className={classes.details}>
                                    <Typography gutterBottom variant='h4' className={classes.headerTitle}  >You Pay </Typography>
                                    <Typography gutterBottom variant='h4' className={classes.headerTitle} >Rs. {getYouPay(cartItems)}</Typography>
                                </div>
                            </CardContent>
                        </Card>
                        <Button
                            color='primary'
                            fullWidth
                            disableElevation
                            variant='contained'
                            onClick={this.openCheckout}
                            endIcon={loading ? false : <Icon>arrow_forward</Icon>}
                        >
                            {loading ? <CircularProgress color='inherit' /> : "Proceed To Checkout"}
                        </Button>
                    </Grid>
                </Grid >



            </div >
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return { cartItems: state.cart.arrOfCartItems, ui: state.ui };
}

export default connect(mapStateToProps, { clearBag, clearErrors, clearSuccessMessage, mapProductsToUser })(withStyles(styles)(bag))

