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
    image: {
        width: 200,
        backgroundSize: 'cover'
    },
    content: {
        display: 'flex',
        padding: 10,
        paddingBottom: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    priceDiv: {
        textAlign: 'right'
    },
    price: {
        fontSize: 18,
        fontWeight: 600
    },
    countDiv: {
        alignItems: 'center',
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    count: {
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#eeeeee',
        borderRadius: 10,
        padding: 4,
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
    },
    quantity: {
        marginTop: 10,
        marginBottom: 10,
    },

}



export class bagItem extends Component {

    subtract = () => this.props.decreaseItemCount(this.props.item)
    add = () => this.props.increaseItemCount(this.props.item)

    handleClose = () => {
        this.props.clearErrors();
        this.props.clearSuccessMessage();
    }

    render() {
        const { classes, item: { productId, count, stock, product_images, title, discount, category1, category2, category3, price }, ui: { errors, success } } = this.props;

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
                                <Typography gutterBottom variant='body2' color='secondary' className={classes.quantity} >{discount}% off on this Item </Typography>

                            </Grid>

                            <Grid item sm={3} className='priceDiv'>
                                <Typography gutterBottom variant='body1'>Total Price</Typography>
                                <Typography variant='h6' className={classes.price}>Rs. {count * price}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.countDiv}>
                            <Grid item className={classes.grid} sm={9} xs={12}>
                                <IconButton
                                    aria-label='remove_icon'
                                    onClick={() => this.subtract()}
                                    className={classes.button}>
                                    <Icon>remove_icon</Icon>
                                </IconButton>
                                <p className={classes.count}>{count}</p>
                                <IconButton
                                    aria-label='add_icon'
                                    onClick={() => this.add()}
                                    className={classes.button}>
                                    <Icon>add_icon</Icon>
                                </IconButton>
                            </Grid>

                            <Grid item sm={3} className='priceDiv' xs={12}>
                                <Button color='primary' disableElevation onClick={() => this.props.removeFromCart(this.props.item)}>Remove Item</Button>
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


export default connect(mapStateToProps, { clearErrors, removeFromCart, clearSuccessMessage, increaseItemCount, decreaseItemCount })(withStyles(styles)(bagItem))
