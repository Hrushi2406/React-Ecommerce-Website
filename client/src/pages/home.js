import React, { Component } from 'react'
import { Grid, withStyles, Card, CardMedia, Typography, GridListTile, GridList } from '@material-ui/core'
import { storeProducts } from '../data'

import Product from "../components/product";
import { connect } from 'react-redux';

const styles = {

}


class home extends Component {

    render() {
        const { classes, products } = this.props
        return (
            <div>
                <Grid container  >
                    {products.map(product =>

                        <Grid item key={product.id} sm={3} xs={12} >
                            <Product product={product} />
                        </Grid>
                    )
                    }

                </Grid>

            </div>
        )
    }
}

const mapStateToProps = state => {

    return { products: state.products };
}

export default connect(mapStateToProps)(withStyles(styles)(home))