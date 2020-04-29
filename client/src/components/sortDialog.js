import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide, Radio, RadioGroup, FormControlLabel, Typography, Divider, withStyles } from '@material-ui/core'

import { viewAll, clearArray } from '../redux/actions/productAction'
import { connect } from 'react-redux';
import { capitalize } from '../utils/functions'


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

    }
    handleClickOpen = () => {
        this.setState({
            ...this.props.products.paginateInfo,
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

    handlesortOrderRadioChange = (e) => {
        this.setState({
            sortOrder: e.target.value
        })
    }

    componentDidMount() {
        console.log("Mounted")
        this.setState({
            ...this.props.products.paginateInfo,
            open: this.state.open
        })
    }


    sortProducts = () => {
        this.setState({
            open: false
        })
        this.props.clearArray()
        const { key, sortBy, sortOrder, category1, category3 } = this.state
        this.props.viewAll(key, 0, sortBy, sortOrder, category1, category3)
    }

    render() {
        const { sortBy, sortOrder } = this.state;
        const { classes, products: { paginateInfo } } = this.props
        console.log("state", this.state)
        // console.log("props", sortBy)

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
                            <FormControlLabel value="" control={<Radio />} label={"None"} />
                            <FormControlLabel value="price" control={<Radio />} label="Price" />
                            <FormControlLabel value="discounted_price" control={<Radio />} label="Discounted Price" />
                            <FormControlLabel value="discount" control={<Radio />} label="Discount Percent" />
                        </RadioGroup>

                        <Typography variant='h6' gutterBottom id="alert-dialog-slide-title"
                        >Order By</Typography >
                        <Divider />
                        <RadioGroup aria-label="order" name="sortOrder" value={sortOrder} onChange={this.handlesortOrderRadioChange}>

                            <FormControlLabel value="asc" control={<Radio />} label="Low to High" />
                            <FormControlLabel value="desc" control={<Radio />} label="High to Low" />

                        </RadioGroup>
                    </DialogContent>
                    <DialogActions className={classes.dialogAction} >
                        <Button fullWidth onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button fullWidth onClick={this.sortProducts} color="primary" variant='contained' disableElevation >
                            Sort
                         </Button>
                    </DialogActions>
                </Dialog >
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { ui: state.ui, user: state.user, products: state.products.viewCategoryData };
}

export default connect(mapStateToProps, { viewAll, clearArray })(withStyles(styles)(SortDialog))
