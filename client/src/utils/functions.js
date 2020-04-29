
import { Slide } from '@material-ui/core'
import React from 'react'

export function TransitionUp(props) {
    return <React.Fragment> <Slide {...props} direction="left" />; </React.Fragment>
}

export const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
export const lowerCase = string => {
    return string.charAt(0) + string.slice(1).toLowerCase()
}


export const getTotalPrice = (arr) => arr.map((item) => item.count * (item.price)).reduce((prev, curr) => curr + prev, 0)
export const getTotalDiscountPrice = (arr) => arr.map((item) => item.count * (item.price - item.discounted_price)).reduce((prev, curr) => curr + prev, 0)
export const getYouPay = (arr) => arr.map((item) => item.count * (item.discounted_price)).reduce((prev, curr) => curr + prev, 0)
