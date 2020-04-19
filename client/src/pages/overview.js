import React, { Component } from 'react'
import { Typography, Grid, Avatar, withStyles, Button, CircularProgress, CardMedia, Icon, Divider, SnackbarContent, Snackbar } from '@material-ui/core';

import { connect } from 'react-redux';
import { fetchProduct } from '../redux/actions/productAction'

import { addToCart } from '../redux/actions/cartAction'
import { capitalize, lowerCase, TransitionUp } from '../utils/functions'
import { clearErrors, clearSuccessMessage } from '../redux/actions/uiAction'
import { AskQuantity } from '../components/askQuantity'

const styles = theme => ({

    center: theme.props.center,
    title: {
        fontSize: 30,
    },
    subtitle: {
        marginBottom: 0
    },
    imageDiv: {
        display: 'flex',
        justifyContent: 'center'
    },
    descriptionDiv: {
        marginTop: 0,
        marginBottom: 15,
    },
    description: {
        fontSize: 17,
        marginTop: 20,
        marginBottom: 15
    },
    stock: {
        fontSize: 16,
    },
    priceDetails: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: 15,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 20,
        alignItems: 'baseline',
        marginTop: 15,
    },
    price: {
        textDecoration: 'line-through',
        marginRight: 20
    },
    discounted_price: {
        fontSize: 20,
        marginRight: 10
    },
    spaced: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    detailTitle: {
        fontSize: 22,
        marginBottom: 0
    },
    detailsDiv: {
        padding: 15,
        paddingBottom: 2,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: "rgba(0, 0, 0, 0.025)",
    },
    label: {
        marginRight: 20
    },
    values: {
        textAlign: "right"
    }

})


class overview extends Component {
    state = {
        imgIndex: 0,
        open: false
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.location.data) {
            this.props.fetchProduct(this.props.match.params.productId)
        }
    }

    handleClose = () => {
        this.props.clearErrors();
        this.props.clearSuccessMessage();
    }


    setActiveImage = (i) => {
        this.setState({
            imgIndex: i
        })
    }

    addToCart = () => {
        this.props.addToCart(this.props.location.data ? this.props.location.data : this.props.product)
    }

    buyNow = () => this.setState({ open: true })


    handleDialogClose = () => this.setState({ open: false })

    render() {
        const { classes, ui: { loading, errors, success } } = this.props;
        const { title, description, category1, category2, category3, price, discounted_price, discount, stock, product_images, labels, values } = this.props.location.data ? this.props.location.data : this.props.product
        const inStock = stock !== 0
        const actualProduct = this.props.location.data ? this.props.location.data : this.props.product
        if (loading) return <div className={classes.center} ><CircularProgress /></div>
        return (
            <div>
                <Grid container spacing={2}>

                    <Snackbar
                        open={errors !== null || success !== null}
                        autoHideDuration={1200}
                        onClose={this.handleClose}
                        TransitionComponent={TransitionUp}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <SnackbarContent elevation={0} className={classes.snackbar} message={errors !== null ? errors : success} />
                    </Snackbar>

                    {/* IMAGEPART */}
                    <Grid item sm={6} xs={12} className={classes.imgDiv}>
                        <Grid item sm={12} xs={12} className={classes.imageDiv}>
                            <CardMedia component="div" image={product_images[this.state.imgIndex]} className="image" />
                        </Grid>
                        <div className="previewDiv">
                            <div className='previewGrid'>
                                {
                                    product_images.map((image, i) => {
                                        return <CardMedia key={image} component="div" onClick={() => this.setActiveImage(i)} image={image} className="previewImage" />
                                    })
                                }
                            </div>

                        </div>
                    </Grid>

                    {/* CONTENTPART */}
                    <Grid item sm={6} xs={12}>
                        <Typography className={classes.title} gutterBottom variant='h4' color='primary'>{lowerCase(title)}</Typography>
                        <Typography className={classes.subtitle} variant='h6' >{capitalize(category1) + "'s " + capitalize(category3) + ' ' + capitalize(category2).slice(0, -1)}</Typography>
                        <div className={classes.descriptionDiv}>
                            <Typography gutterBottom variant='body1' className={classes.description} >{description}</Typography>
                            <Typography gutterBottom variant='body2' className={classes.stock} color='secondary' >{stock === 0 ? "Currently out of stock" : stock + " items available in stock"}  </Typography>
                        </div>

                        <div className={classes.container}>
                            <div className={classes.priceDetails}>
                                <Typography gutterBottom variant='body1' className={classes.discounted_price} >Rs. {discounted_price}</Typography>
                                <Typography gutterBottom variant='body2' className={classes.price} > Rs. {price}  </Typography>
                            </div>
                            <Typography gutterBottom variant='body1' color='secondary' className={classes.discount} > {discount}% off </Typography>
                        </div>

                        <div className={classes.spaced}>
                            <AskQuantity handleClose={this.handleDialogClose} product={actualProduct} history={this.props.history} open={this.state.open} />

                            <Button fullWidth variant='contained' disabled={!inStock} onClick={this.buyNow} color='primary' disableElevation> Buy Now</Button>
                            <Button fullWidth color="secondary" disabled={!inStock} onClick={this.addToCart} startIcon={<Icon>local_mall_rounded_icon</Icon>} > Add to Bag</Button>
                        </div>
                        <div >
                            <Typography gutterBottom variant='h6' color='primary' className={classes.detailTitle} >Product Details</Typography>
                            <Divider />
                            <div className={classes.detailsDiv}>
                                {
                                    labels.map((l, i) => {
                                        return <div key={l} className={classes.spaced}>
                                            <Typography gutterBottom variant='body1' className={classes.label} >{l}</Typography>
                                            <Typography gutterBottom variant='body2' className={classes.values} >{values[i]}</Typography>
                                        </div>
                                    })
                                }


                            </div>
                        </div>

                    </Grid>
                </Grid>

            </div >
        )
    }
}

const mapStateToProps = state => {

    return { ui: state.ui, product: state.products.currentOverview };
}

export default connect(mapStateToProps, { fetchProduct, addToCart, clearErrors, clearSuccessMessage })(withStyles(styles)(overview))
