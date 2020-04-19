import React, { Component } from 'react'
import { Grid, withStyles, Card, CardMedia, Typography, GridListTile, GridList, CircularProgress, Button, Divider, Snackbar, Slide, SnackbarContent } from '@material-ui/core'
import { storeProducts } from '../data'
import Product from "../components/product";
import { connect } from 'react-redux';

import { Link } from 'react-router-dom'

import { getProducts, clearArray } from '../redux/actions/productAction'

import { clearErrors } from '../redux/actions/uiAction'

const styles = theme => ({
    main: {
        marginBottom: 20,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    divider: {
        marginTop: 5,
        marginBottom: 10,
    },
    center: theme.props.center,
    snackbar: theme.props.snackbar
})




class home extends Component {
    componentDidMount() {
        if (Object.keys(this.props.products).length === 0) {
            this.props.getProducts()
        }
    }

    render() {
        const { classes, products, ui: { loading } } = this.props
        return (
            <div>

                {
                    loading ?
                        <div className={classes.center}>
                            <CircularProgress />
                        </div>
                        :
                        Object.keys(products).map(key => {
                            return <div key={key} className={classes.main}>
                                <div className={classes.container}>
                                    <Typography variant='h5'>{key.toUpperCase()}</Typography>
                                    <Button
                                        color='primary'
                                        disableElevation
                                        component={Link}
                                        onClick={() => this.props.clearArray()}
                                        to={'/products/' + key} >
                                        View All
                                 </Button>
                                </div>
                                <Divider className={classes.divider} />
                                <Grid container>
                                    {products[key].map(product =>
                                        <Grid item key={product.productId} sm={3} xs={12} >
                                            <Product product={product} history={this.props.history} />
                                        </Grid>
                                    )}
                                </Grid>
                            </div>

                        })


                }


            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ui: state.ui, user: state.user, products: state.products.productsData };
}

export default connect(mapStateToProps, { getProducts, clearArray, clearErrors })(withStyles(styles)(home))