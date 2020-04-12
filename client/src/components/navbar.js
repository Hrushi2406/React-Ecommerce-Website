import React, { Component } from 'react'

//MUI Stuff

import { AppBar, Toolbar, Button, Icon, withStyles, Container } from "@material-ui/core";
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
            <AppBar position='static' >
                <Container>
                    <Toolbar disableGutters variant='dense' className={classes.center}>
                        <Button color='inherit' component={Link} to='/'>Home</Button>

                        <Button color='inherit' component={Link} to='/login'>Login</Button>
                        <Button color='inherit' component={Link} to='/signUp'>SignUp</Button>
                        <Button color='inherit' component={Link} to='/cart' startIcon={<Icon>shopping_cart_icon</Icon>} > Cart</Button>

                    </Toolbar>
                </Container>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Navbar)
