import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Card, CardMedia, CardContent, Typography, withStyles, CardActionArea, Button, CardActions, Paper, Icon } from '@material-ui/core'

import { connect } from 'react-redux';

const styles = {
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
        justifyContent: 'space-between'
    },
    priceDiv: {
        display: 'flex',
        alignItems: 'center'
    },
    price: {
        textDecoration: 'line-through'
    },
    discounted_price: {
        fontSize: 17,
        marginRight: 10
    }


}

const loweCase = string => string.charAt(0) + string.slice(1).toLowerCase()
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export class product extends Component {
    render() {

        const { classes, product: { productId, title, category2, category3, product_images, price, discount, discounted_price } } = this.props;
        return (
            <div>
                <Card elevation={0} raised={false} className={classes.card}>
                    <CardActionArea component={Link} to={{ pathname: '/categoryOverview/' + productId, data: product }} >
                        <CardMedia
                            image={product_images[0]}
                            title={title}
                            className={classes.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" >{loweCase(title)}</Typography>

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
                        <Button
                            onClick={() => console.log('hi')}
                            size="small"
                            disableElevation
                            color="secondary"
                            className={classes.end} >
                            Buy Now
                        </Button>
                        <Button
                            onClick={() => console.log('hi')}
                            size="small"
                            color="primary"
                            className={classes.end}
                            startIcon={<Icon>shopping_cart_icon</Icon>}>
                            Add To Cart
                        </Button>

                    </CardActions>
                </Card>
            </div >
        )
    }
}

export default connect(null)(withStyles(styles)(product))
