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

export class FilterDialog extends Component {
    state = {
        open: false,
        gender: '',
        type: ''
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

    handleGenderRadioChange = (e) => {
        this.setState({
            gender: e.target.value
        })
    }

    handleTypeRadioChange = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    render() {
        const { type, gender } = this.state;
        const { classes } = this.props
        return (
            <div>
                <Button color='secondary' onClick={this.handleClickOpen} >
                    Filter
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
                        <Typography variant='h6' gutterBottom id="alert-dialog-slide-title">Filter</Typography >
                        <Divider />
                        <RadioGroup aria-label="type" name="filterBy" value={gender} onChange={this.handleGenderRadioChange}>
                            <FormControlLabel value="men" control={<Radio />} label="Men" />
                            <FormControlLabel value="women" control={<Radio />} label="Women" />
                        </RadioGroup>
                        <Typography variant='h6' gutterBottom id="alert-dialog-slide-title" style={{ marginTop: 10 }} >Type</Typography >
                        <Divider />
                        <RadioGroup aria-label="order" name="Type" value={type} onChange={this.handleTypeRadioChange}>
                            <FormControlLabel value="ascending" control={<Radio />} label="Biker" />
                            <FormControlLabel value="descending" control={<Radio />} label="Stager" />
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions className={classes.dialogAction} >
                        <Button fullWidth onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button fullWidth onClick={this.handleClose} color="primary" variant='contained' disableElevation >
                            Filter
                         </Button>
                    </DialogActions>
                </Dialog >
            </div>
        )
    }
}

export default withStyles(styles)(FilterDialog)
