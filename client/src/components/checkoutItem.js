import React, { Component } from 'react'
import { Card, CardMedia, CardContent, Typography, withStyles, Grid, Icon, CardActions, Button, IconButton, CardActionArea, Divider, Slide, Snackbar, SnackbarContent } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { increaseItemCount, removeFromCart, decreaseItemCount } from '../redux/actions/cartAction'
import { clearErrors, clearSuccessMessage } from '../redux/actions/uiAction'
import { TransitionUp, capitalize, lowerCase } from '../utils/functions'


const styles = {
    card: {

        display: 'flex',
        marginBottom: 5,
        borderRadius: 5,
        background: 'transparent'
    },
    content: {
        display: 'flex',
        padding: 10,
        paddingBottom: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    quantity: {
        marginTop: 10,
        marginBottom: 10,
    },
    priceDiv: {
        textAlign: 'right'
    },
    price: {
        fontSize: 18,
        // fontWeight: 600
    },
    countDiv: {
        alignItems: 'center',
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
    }
}



export class checkoutItem extends Component {

    handleClose = () => {
        this.props.clearErrors();
        this.props.clearSuccessMessage();
    }

    render() {
        const { classes, item: { productId, count, discounted_price, stock, discount, product_images, title, category1, category2, category3, price }, ui: { errors, success } } = this.props;

        return (
            < React.Fragment >

                <Card className={classes.card} elevation={0}>
                    <CardMedia component={Link} to={'/categoryView/' + productId}
                        image={product_images[0]}
                        title={title}
                        className='cartItemImage'
                    />
                    <div className={classes.content}>
                        <Grid container >
                            <Grid item sm={9}>
                                <Typography gutterBottom variant="body1" color='primary'>{lowerCase(title)}</Typography>
                                <Typography gutterBottom variant='body2'>{capitalize(category1) + "'s " + capitalize(category3) + ' ' + capitalize(category2)}</Typography>
                                <Typography gutterBottom variant='body2' color='secondary' className={classes.quantity} >Order quantity : {count} </Typography>
                            </Grid>
                            <Grid item sm={3} className='priceDiv'>
                                <Typography gutterBottom variant='body1'>Price</Typography>
                                <Typography variant='body1' className={classes.price}>Rs. {count * discounted_price}</Typography>
                                <Typography gutterBottom variant='body2' color='secondary' className={classes.quantity} >{discount}% off </Typography>

                            </Grid>
                        </Grid>
                    </div>
                </Card>
                <Divider className={classes.divider} />
            </ React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return { ui: state.ui };
}


export default connect(mapStateToProps, { clearErrors, removeFromCart, clearSuccessMessage, increaseItemCount, decreaseItemCount })(withStyles(styles)(checkoutItem))
