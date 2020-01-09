import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Snackbar from '@material-ui/core/Snackbar'
import { MySnackbarContentWrapper } from './SnackbarContent'


const CustomizedSnackbar = (props) => {
    const { open, onClose, variant, message, ...other } = props

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            {...other}
        >
            <MySnackbarContentWrapper
                onClose={onClose}
                variant={variant}
                message={message}
            />
        </Snackbar>
    )
}

CustomizedSnackbar.propTypes = {
    open: PropTypes.bool,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
}

export { CustomizedSnackbar as default }