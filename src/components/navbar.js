import React, { Component } from 'react'

//MUI Stuff

import { AppBar, Toolbar, Button, Icon, withStyles } from "@material-ui/core";
import { Link } from 'react-router-dom';

const styles = {
    center: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
    }
}


export class Navbar extends Component {
    render() {
        const { classes } = this.props
        return (
            <AppBar position='fixed'>
                <Toolbar variant='dense' className={classes.center}>
                    <Button color='inherit'>Home</Button>
                    {/* <Link to='/cart'> */}
                    <Button color='inherit' component={Link} to='/cart' startIcon={<Icon>shopping_cart_icon</Icon>} > Cart</Button>
                    {/* </Link> */}
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Navbar)
