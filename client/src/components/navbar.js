import React, { Component } from 'react'

//MUI Stuff

import { AppBar, Toolbar, Button, Icon, withStyles, Container, Badge } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCartItems } from "../redux/actions/cartAction";
import { getUser } from "../redux/actions/userAction";


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
    componentDidMount() {
        this.props.fetchCartItems();
        if (localStorage.authToken) {
            this.props.getUser();

        }
    }
    render() {
        const { classes, cart } = this.props
        return (
            <AppBar position='static' color='primary' className={classes.appBar} >
                <Container>
                    <Toolbar disableGutters variant='dense' className={classes.center}>
                        <Button color='inherit' component={Link} to='/'>Home</Button>

                        <Button color='inherit' component={Link} to='/login'>Login</Button>
                        <Button color='inherit' component={Link} to='/signUp'>SignUp</Button>
                        <Button color='inherit' component={Link} to='/bag' >
                            <Badge badgeContent={cart === null ? 0 : cart.length}>
                                <Icon>local_mall_outlined_icon</Icon>
                            </Badge>
                        </Button>

                    </Toolbar>
                </Container>
            </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return { cart: state.cart.arrOfCartItems };
}

export default connect(mapStateToProps, { fetchCartItems, getUser })(withStyles(styles)(Navbar))
