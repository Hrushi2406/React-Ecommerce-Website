import React, { Component } from 'react'

//MUI Stuff

import { AppBar, Toolbar, Button, Icon, withStyles, Container } from "@material-ui/core";
import { Link } from 'react-router-dom';

const styles = {
    center: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    appBar: {
    }

}


export class Navbar extends Component {
    render() {
        const { classes } = this.props
        return (
            <AppBar position='static' color='primary' className={classes.appBar} >
                <Container>
                    <Toolbar disableGutters variant='dense' className={classes.center}>
                        <Button color='inherit' component={Link} to='/'>Home</Button>

                        <Button color='inherit' component={Link} to='/login'>Login</Button>
                        <Button color='inherit' component={Link} to='/signUp'>SignUp</Button>
                        <Icon>local_mall_outlined_icon</Icon>
                        {/* <Button color='inherit' component={Link} to='/cart' startIcon={<Icon>local_mall_rounded_icon</Icon>} > Bag</Button> */}

                    </Toolbar>
                </Container>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Navbar)
