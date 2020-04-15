import React, { Component } from 'react'
import { Typography, Grid, Avatar, withStyles, Button, CircularProgress, CardMedia, Icon, Divider } from '@material-ui/core';

import { connect } from 'react-redux';
import { fetchProduct } from '../redux/actions/productAction'

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
        background: "#f2f2f2"
    },
    label: {
        fontSize: 17,
        marginRight: 20
    },
    values: {
        textAlign: "right"
    }

})

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

class overview extends Component {
    state = {
        imgIndex: 0
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.location.data) {
            this.props.fetchProduct(this.props.match.params.productId)
        }
    }

    setActiveImage = (i) => {
        this.setState({
            imgIndex: i
        })
    }

    render() {
        const { classes, ui: { loading } } = this.props;
        const { title, description, category1, category2, category3, price, discounted_price, discount, stock, inStock, product_images, labels, values } = this.props.location.data ? this.props.location.data : this.props.product

        if (loading) return <div className={classes.center} ><CircularProgress /></div>
        return (
            <div>
                <Grid container spacing={2}>


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
                        <Typography className={classes.title} gutterBottom variant='h4' color='primary'>{title}</Typography>
                        <Typography className={classes.subtitle} variant='h6' >{capitalize(category1) + "'s " + capitalize(category3) + ' ' + capitalize(category2).slice(0, -1)}</Typography>
                        <div className={classes.descriptionDiv}>
                            <Typography gutterBottom variant='body1' className={classes.description} >{description}</Typography>
                            <Typography gutterBottom variant='body2' className={classes.stock} color='secondary' >{stock} items available in stock </Typography>
                        </div>

                        <div className={classes.container}>
                            <div className={classes.priceDetails}>
                                <Typography gutterBottom variant='body1' className={classes.discounted_price} >Rs. {discounted_price}</Typography>
                                <Typography gutterBottom variant='body2' className={classes.price} > Rs. {price}  </Typography>
                            </div>
                            <Typography gutterBottom variant='body1' color='secondary' className={classes.discount} > {discount}% off </Typography>
                        </div>

                        <div className={classes.spaced}>
                            <Button fullWidth variant='contained' disabled={!inStock} color='primary' disableElevation> Buy Now</Button>
                            <Button fullWidth color="secondary" startIcon={<Icon>local_mall_rounded_icon</Icon>} > Add to Bag</Button>
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

export default connect(mapStateToProps, { fetchProduct })(withStyles(styles)(overview))
