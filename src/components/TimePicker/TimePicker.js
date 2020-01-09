import React from 'react'

import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import CustomizedTextField from '../TextField/CustomizedTextField'
import CheckCircleIcon from '@material-ui/core/SvgIcon/SvgIcon'
import InputAdornment from '@material-ui/core/InputAdornment'

const useStyles = makeStyles(theme => ({
    textField: { margin: theme.spacing(1) }
}))

const TimePicker = ({ inputProps, ...props }) => (
    <CustomizedTextField
        type='time'
        InputLabelProps={{ shrink: true }}
        inputProps={{ ...inputProps, step: 300 }}
        {...props}
    />
)

export { TimePicker as default }