import React from 'react'
import { makeStyles, Dialog, DialogTitle, Typography, DialogContent, Button, DialogActions, Divider, IconButton, Icon } from '@material-ui/core'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mapProductsToUser } from '../redux/actions/checkoutAction'


const useStyles = makeStyles(theme => ({
    dialog: {
        width: '100%'
    },
    contentDialog: {
        [theme.breakpoints.up('sm')]: {
            minWidth: 500,
        },
    },
    title: {
        fontSize: '1.25rem',
        textAlign: 'center'
    },
    dialogAction: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    grid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    count: {
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold'
    },

}));

export const AskQuantity = ({ open, handleClose, product, history }) => {
    const classes = useStyles()
    const [count, setcount] = useState(1)
    const dispatch = useDispatch()

    const proceedToCheckout = () => {
        product.count = count
        dispatch(mapProductsToUser(history, [product]))
    }
    return (
        <React.Fragment>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>

                <DialogContent className={classes.contentDialog}  >
                    <Typography variant='h4' className={classes.title} gutterBottom id="alert-dialog-slide-title">Select Quantity</Typography >
                    <Divider />

                    <div className={classes.grid}>
                        <Button
                            aria-label='remove_icon'
                            color='primary'
                            disabled={count <= 1 ? true : false}
                            onClick={() => setcount(prev => prev - 1)}
                            className={classes.button}>
                            <Icon>remove_icon</Icon>
                        </Button>
                        <p className={classes.count}>{count}</p>
                        <Button
                            color='primary'

                            aria-label='add_icon'
                            onClick={() => setcount(prev => prev + 1)}
                            className={classes.button}>
                            <Icon>add_icon</Icon>
                        </Button>
                    </div>
                </DialogContent>

                <DialogActions className={classes.dialogAction} >
                    <Button fullWidth onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button fullWidth onClick={proceedToCheckout} color="primary" variant='contained' disableElevation >
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    )
}
