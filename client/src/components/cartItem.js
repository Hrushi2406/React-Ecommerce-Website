import React, { Component } from 'react'
import { Card, CardMedia, CardContent, Typography, withStyles, Grid, Icon, CardActions, Button, IconButton, CardActionArea } from '@material-ui/core'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        borderRadius: 10,
    },
    image: {
        minWidth: 200,
        height: 200,
        backgroundSize: 'cover'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        padding: 25,
    },
    count: {
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: "#eeee",
        borderRadius: 10,
        padding: 5,
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        height: '20%',
        alignItems: 'center'
    }
}


export class cartItem extends Component {
    state = {
        count: 1,
    }

    subtract = () => {
        this.setState({
            count: this.state.count - 1,
        })
    }

    add = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }
    render() {
        const { classes, item: { id, img, title, company, price, count } } = this.props;

        return (

            < div >
                <Card className={classes.card} elevation={0}>
                    <CardMedia component={Link} to={'/mobileOverview/' + id}
                        image={img}
                        title={title}
                        className={classes.image}
                    />
                    <CardContent className={classes.content}>
                        <Grid container >
                            <Grid item sm={9}>
                                <Typography gutterBottom variant="h6" color='primary'>{title}</Typography>
                                <Typography gutterBottom variant='body1'>{company}</Typography>
                            </Grid>
                            <Grid item sm={3} >
                                <Typography gutterBottom variant='h6'>Total Price</Typography>
                                <Typography variant='h6'>${count * (price * 50)}</Typography>
                            </Grid>
                        </Grid>

                        <Grid container className={classes.grid}>
                            <Grid item className={classes.grid} sm={9}>
                                <IconButton
                                    aria-label='remove_icon'
                                    onClick={() => console.log('hi')}
                                    className={classes.button}>
                                    <Icon>remove_icon</Icon>
                                </IconButton>
                                <p className={classes.count}>{count}</p>
                                <IconButton
                                    aria-label='add_icon'
                                    onClick={() => console.log('hi')}
                                    className={classes.button}>
                                    <Icon>add_icon</Icon>
                                </IconButton>
                            </Grid>

                            <Grid item sm={3}>
                                <Button color='primary' onClick={() => console.log('hi')}>Remove Item</Button>
                            </Grid>
                        </Grid>


                    </CardContent>

                </Card>
            </div >
        )
    }
}

export default connect(null)(withStyles(styles)(cartItem))
