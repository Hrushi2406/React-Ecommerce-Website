import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckoutItem from './checkoutItem';
import { storeProducts } from '../data';


const SummaryStep = ({ checkoutProducts }) => {
    var cartItems = []
    cartItems = checkoutProducts
    return (
        <div>
            {cartItems.map(item => <CheckoutItem item={item} key={item.productId} />)}
        </div>

    )
}

const mapStateToProps = (state) => {
    return { checkoutProducts: state.checkout.products }
}


export default connect(mapStateToProps)(SummaryStep)

