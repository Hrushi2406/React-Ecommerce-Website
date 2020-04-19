import React, { Component } from 'react'
import { withStyles, CircularProgress, Button, Typography, Grid, Divider, Checkbox, FormControlLabel } from '@material-ui/core'
import { connect } from 'react-redux';
import Product from "../components/product";

import { viewAll } from '../redux/actions/productAction'
import SortDialog from '../components/sortDialog';
import FilterDialog from '../components/filterDialog';
import InfiniteScroller from 'react-infinite-scroller'


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
    center: {
        marginTop: 100,
        marginBottom: 100,
        textAlign: 'center'
    }
})


export class categoryView extends Component {

    state = {
        paginateData: []
    }

    componentDidMount() {
        // this.props.viewAll(this.props.match.params.key, 0)
    }

    loadMore = (page) => {

        page = this.props.products.paginateInfo.page + 1
        const { sortBy, sortOrder, category1, category3 } = this.props.products.paginateInfo
        this.props.viewAll(this.props.match.params.key, page, sortBy, sortOrder, category1, category3)
    }



    render() {
        var { classes, products: { categoryData, paginateInfo: { key, hasMore } }, ui: { loading } } = this.props;
        if (loading) return <div className={classes.center}><CircularProgress /></div>
        return (

            <InfiniteScroller
                pageStart={-1}
                initialLoad={true}
                loadMore={this.loadMore}
                hasMore={hasMore}
                loader={<div key={0} className={classes.center}> <CircularProgress /> </div>}
            >
                <div className={classes.main}>

                    <div className={classes.container}>
                        <SortDialog />
                        <Typography variant='h5'>{key && key.toUpperCase()}</Typography>
                        <FilterDialog />
                    </div>
                    <Divider className={classes.divider} />
                    <Grid container>
                        {categoryData.map(product =>
                            <Grid item key={product.productId} sm={3} xs={12} >
                                <Product product={product} history={this.props.history} />
                            </Grid>
                        )}
                    </Grid>
                </div>
            </InfiniteScroller>

        )
    }
}

const mapStateToProps = state => {
    return { ui: state.ui, user: state.user, products: state.products.viewCategoryData };
}

export default connect(mapStateToProps, { viewAll })(withStyles(styles)(categoryView))
