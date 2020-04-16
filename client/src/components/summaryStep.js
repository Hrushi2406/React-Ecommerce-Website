import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckoutItem from './checkoutItem';
import { storeProducts } from '../data';


export const SummaryStep = () => {
    var cartItems = []
    cartItems = storeProducts
    return (
        <div>
            {cartItems.map(item => <CheckoutItem item={item} key={item.productId} />)}
        </div>

    )
}

const mapStateToProps = (state) => ({

})


export default connect(null)(SummaryStep)

