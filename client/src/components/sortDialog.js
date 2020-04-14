import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide, Radio, RadioGroup, FormControlLabel, Typography, Divider, withStyles } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


const styles = {
    dialog: {
        width: '100%'
    },
    contentDialog: {
        minWidth: 500,
    },
    dialogAction: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

export class SortDialog extends Component {
    state = {
        open: false,
        sortBy: '',
        orderBy: '',
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    handleSortByRadioChange = (e) => {
        this.setState({
            sortBy: e.target.value
        })
    }

    handleOrderByRadioChange = (e) => {
        this.setState({
            orderBy: e.target.value
        })
    }

    render() {
        const { sortBy, orderBy } = this.state;
        const { classes } = this.props
        return (
            <div>
                <Button color='primary' onClick={this.handleClickOpen} >
                    Sort By
                </Button>

                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted

                    className={classes.dialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >

                    <DialogContent className={classes.contentDialog}  >
                        <Typography variant='h6' gutterBottom id="alert-dialog-slide-title">Sort By</Typography >
                        <Divider />
                        <RadioGroup aria-label="type" name="sortBy" value={sortBy} onChange={this.handleSortByRadioChange}>
                            <FormControlLabel value="price" control={<Radio />} label="Price" />
                            <FormControlLabel value="discounted_price" control={<Radio />} label="Discounted Price" />
                            <FormControlLabel value="discount" control={<Radio />} label="Discount" />
                        </RadioGroup>

                        <Typography variant='h6' gutterBottom id="alert-dialog-slide-title"
                        >Order By</Typography >
                        <Divider />
                        <RadioGroup aria-label="order" name="orderBy" value={orderBy} onChange={this.handleOrderByRadioChange}>
                            <FormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                            <FormControlLabel value="descending" control={<Radio />} label="Descending" />
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions className={classes.dialogAction} >
                        <Button fullWidth onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button fullWidth onClick={this.handleClose} color="primary" variant='contained' disableElevation >
                            Sort
                         </Button>
                    </DialogActions>
                </Dialog >
            </div>
        )
    }
}

export default withStyles(styles)(SortDialog)
