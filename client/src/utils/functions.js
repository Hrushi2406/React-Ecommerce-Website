
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
