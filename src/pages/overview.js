import React, { Component } from 'react'
import { Typography, Grid, Avatar, withStyles, Button } from '@material-ui/core';
import { storeProducts } from '../data';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions'


const styles = {
    center: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    specifiedHeight: {
        height: "50vh",
        margin: '20px 0'
    }
    ,
    price: {
        margin: '20px 0',
        fontSize: 23
    }
}


class overview extends Component {
    render() {
        const { classes } = this.props;
        var product = this.props.products.find(prod => prod.id == this.props.match.params.id)
        const { img, title, info, company, inCart, price } = product;
        console.log(this.props);
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item sm xs={12}>
                        <img src={'../' + img} ></img>
                    </Grid>
                    <Grid item sm xs={12}>
                        <Typography gutterBottom variant='h4' color='primary'>{title}</Typography>
                        <Typography gutterBottom variant='h6'>{company}</Typography>
                        <div className={classes.specifiedHeight}>
                            <Typography variant='body1'>{info}</Typography>
                        </div>
                        <Typography gutterBottom variant='h6' className={classes.price}>Price: $ {price * 50}</Typography>
                        <Grid container className={classes.center}>
                            <Button variant='contained' > Buy Now</Button>
                            {inCart ? <div></div> : <Button color="primary" onClick={() => this.props.addToCart(product)} > Add to Cart</Button>}
                        </Grid>

                    </Grid>
                </Grid>

            </div >
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return { products: state.products };
}

export default connect(mapStateToProps, { addToCart })(withStyles(styles)(overview))
