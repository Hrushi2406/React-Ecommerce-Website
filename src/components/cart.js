import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { getCartItems } from '../redux/actions'
import Product from "./product";

class cart extends Component {
    componentDidMount() {
        this.props.getCartItems()
    }
    render() {
        console.log(this.props)
        const { cartItems } = this.props
        return (
            <div>
                <Grid container>
                    {cartItems.map(product =>

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
    console.log(state)
    return { cartItems: state.cart };
}


export default connect(mapStateToProps, { getCartItems })(cart)
