import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Card, CardMedia, CardContent, Typography, withStyles, CardActionArea, Button, CardActions, Paper, Icon } from '@material-ui/core'
import { addToCart } from '../redux/actions';
import { connect } from 'react-redux';

const styles = {
    card: {
        margin: 10,
        borderRadius: 10,
        textAlign: "center"
    },
    image: {
        height: 250,
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    center: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    end: {

    }

}

export class product extends Component {
    render() {
        const { classes, product: { img, title, company, price, id } } = this.props;
        return (
            <div>
                <Card elevation={0} raised={false} className={classes.card}>
                    <CardActionArea component={Link} to={'/mobileOverview/' + id} >
                        <CardMedia
                            image={img}
                            title={title}
                            className={classes.image}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" >{title}</Typography>
                            <Typography gutterBottom variant="subtitle1" >{company}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                             </Typography>
                        </CardContent>

                    </CardActionArea>
                    <CardActions className={classes.center}>
                        <Typography gutterBottom variant="p" component="p"> $ {price * 50}</Typography>
                        <Button
                            onClick={() => this.props.addToCart(this.props.product)}
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

export default connect(null, { addToCart })(withStyles(styles)(product))
