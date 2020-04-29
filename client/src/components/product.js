import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Card, CardMedia, CardContent, Typography, withStyles, CardActionArea, Button, CardActions, Paper, Icon, Slide, Snackbar, SnackbarContent } from '@material-ui/core'

import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction'
import { clearErrors, clearSuccessMessage } from '../redux/actions/uiAction'
import { TransitionUp, capitalize, lowerCase } from '../utils/functions'

import { AskQuantity } from '../components/askQuantity';

const styles = theme => ({
    card: {
        margin: 10,
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "#f3f9fb"
        // backgroundColor: '#E5E5E5'
    },
    image: {
        height: 250,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "0.2s",
        background: 'left'

    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    center: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    cardContent: {
        paddingBottom: 5
    },
    priceDiv: {
        display: 'flex',
        alignItems: 'center'
    },
    price: {
        textDecoration: 'line-through'
    },
    stock: {
        margin: "0 auto"
    },
    discounted_price: {
        fontSize: 17,
        marginRight: 10
    },
    snackbar: theme.props.snackbar
})




export class product extends Component {

    state = {
        open: false,
    }

    handleClose = () => {
        this.props.clearErrors();
        console.log('fired')
    }

    buyNow = () => {
        this.setState({ open: true })
        // product.count = 1
        // this.props.mapProductsToUser(this.props.history, [product])
    }

    handleDialogClose = () => this.setState({ open: false })


    render() {

        const { classes, history, product: { productId, title, stock, category2, category3, product_images, price, discount, discounted_price }, ui: { errors, success } } = this.props;
        const inStock = stock !== 0
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
                <Card elevation={0} raised={false} className={classes.card}>
                    <CardActionArea component={Link} to={{ pathname: '/categoryView/' + productId, data: this.props.product }} >
                        <CardMedia
                            image={product_images[0]}
                            title={title}
                            className={classes.image}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h6" >{lowerCase(title)}</Typography>
                            <Typography gutterBottom variant="body1" >{capitalize(category3) + ' ' + capitalize(category2)}</Typography>
                            <div className={classes.container}>
                                <div className={classes.priceDiv}>
                                    <Typography gutterBottom variant="body2" className={classes.discounted_price}> Rs. {discounted_price} </Typography>
                                    <Typography gutterBottom variant="body2" className={classes.price}> Rs. {price} </Typography>
                                </div>
                                <Typography gutterBottom variant="caption"> ({discount}% off)</Typography>
                            </div>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.center}>
                        {

                            !inStock ? <Typography gutterBottom variant='body2' className={classes.stock} color='secondary' >Currently out of stock</Typography>
                                : <React.Fragment >
                                    <AskQuantity handleClose={this.handleDialogClose} product={this.props.product} history={history} open={this.state.open} />
                                    <Button
                                        size="small"
                                        disableElevation
                                        color="secondary"
                                        onClick={this.buyNow}
                                        disabled={!inStock}
                                        className={classes.end} >
                                        Buy Now
                                    </Button>
                                    <Button
                                        onClick={() => this.props.addToCart(this.props.product)}
                                        size="small"
                                        color="primary"
                                        className={classes.end}
                                        startIcon={<Icon>local_mall_outlined_icon</Icon>}>
                                        Add to Bag
                                    </Button>
                                </React.Fragment>

                        }

                    </CardActions>
                </Card>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return { ui: state.ui };
}


export default connect(mapStateToProps, { addToCart, clearErrors, clearSuccessMessage })(withStyles(styles)(product))
