import React, { Component } from 'react'
import { Grid, Card, CardContent, Typography, withStyles, Divider, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import Product from "../components/product";
import CartItem from '../components/cartItem';
import { Link } from 'react-router-dom';

const styles = {
    center: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'

    },
    card: {
        paddingBottom: 0,
        borderRadius: 5,
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
    }
}

class cart extends Component {
    componentDidMount() {

    }

    render() {
        const { cartItems, classes } = this.props
        const getTotalAmount = () => cartItems.map((item) => item.count * (item.price * 50)).reduce((prev, curr) => curr + prev, 0)


        return (
            <div>
                {
                    cartItems.length === 0 ?
                        <div className={classes.center}>
                            <Typography gutterBottom variant='h6'>Your Cart Is Empty</Typography>
                            <Button component={Link} to='/' variant='contained' color='primary'>Go Back to Home</Button>
                        </div>
                        :
                        <Grid container spacing={2}>
                            <Grid item sm={8} xs={12} >
                                {cartItems.map(item => <CartItem item={item} key={item.id} />)}
                            </Grid>

                            <Grid item sm={4} xs={12}>
                                <Card className={classes.card} elevation={0}>

                                    <CardContent style={{ paddingBottom: 0 }}>
                                        <Typography gutterBottom variant='h5' color='textSecondary'>Price Details</Typography>
                                        <Divider />
                                        <div className={classes.details}>
                                            <Typography gutterBottom variant='body1' >Price ({cartItems.length} items)</Typography>
                                            <Typography gutterBottom variant='body1' >$ {getTotalAmount()} </Typography>
                                        </div>
                                        <Divider />
                                        <div className={classes.details}>
                                            <Typography gutterBottom variant='h6' className={classes.bold} >Total Amount </Typography>
                                            <Typography gutterBottom variant='h6' className={classes.bold}>$ {getTotalAmount()}</Typography>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>}
            </div >
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return { cartItems: state.cart };
}

export default connect(mapStateToProps)(withStyles(styles)(cart))

