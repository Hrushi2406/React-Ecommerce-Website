import React, { Component } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide, Radio, RadioGroup, FormControlLabel, Typography, Divider, withStyles } from '@material-ui/core'
import { connect } from 'react-redux';
import { viewAll, clearArray } from '../redux/actions/productAction'


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

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)


export class FilterDialog extends Component {
    state = {
        open: false,

    }
    handleClickOpen = () => {
        this.setState({
            open: true,
            ...this.props.products.paginateInfo,
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    handlecategory1RadioChange = (e) => {
        this.setState({
            category1: e.target.value
        })
    }

    handlecategory3RadioChange = (e) => {
        this.setState({
            category3: e.target.value
        })
    }

    componentDidMount() {
        console.log("Mounted")
        this.setState({
            ...this.props.products.paginateInfo,
            open: this.state.open
        })
    }

    filterProducts = () => {
        this.setState({
            open: false
        })
        this.props.clearArray()
        const { key, sortBy, sortOrder, category1, category3 } = this.state
        this.props.viewAll(key, 0, sortBy, sortOrder, category1, category3)
    }

    render() {
        const { category1, category3 } = this.state;
        const { classes, products: { paginateInfo: { categories } } } = this.props
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
                        <RadioGroup aria-label="type" name="filterBy" value={category1} onChange={this.handlecategory1RadioChange}>
                            <FormControlLabel value="" control={<Radio />} label={capitalize("none")} />
                            {
                                categories.category1.map(cat => {
                                    return <FormControlLabel key={cat} value={cat} control={<Radio />} label={capitalize(cat)} />
                                })
                            }
                        </RadioGroup>

                        <Typography variant='h6' gutterBottom id="alert-dialog-slide-title" style={{ marginTop: 10 }} >Type</Typography >
                        <Divider />
                        <RadioGroup aria-label="order" name="Type" value={category3} onChange={this.handlecategory3RadioChange}>
                            <FormControlLabel value="" control={<Radio />} label={capitalize("none")} />
                            {
                                categories.category3.map(cat => {
                                    return <FormControlLabel key={cat} value={cat} control={<Radio />} label={capitalize(cat)} />
                                })
                            }
                        </RadioGroup>

                    </DialogContent>
                    <DialogActions className={classes.dialogAction} >
                        <Button fullWidth onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button fullWidth onClick={this.filterProducts} color="primary" variant='contained' disableElevation >
                            Filter
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

export default connect(mapStateToProps, { viewAll, clearArray })(withStyles(styles)(FilterDialog))
