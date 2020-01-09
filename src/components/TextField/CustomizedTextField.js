import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'

const CustomizedTextField = ({ isInvalid, InputProps, ...props }) => {
    const invalid = isInvalid(props.value)
    let startAdornment

    if (props.value === '') {
        startAdornment = null
    } else if (!invalid) {
        startAdornment = (
            <InputAdornment position='start'>
                <CheckCircleIcon color='primary' />
            </InputAdornment>
        )
    } else {
        startAdornment = (
            <InputAdornment position='start'>
                <ErrorIcon color='error' />
            </InputAdornment>
        )
    }

    return (
        <TextField
            {...props}
            error={!!invalid}
            helperText={invalid}
            InputProps={{ ...InputProps, startAdornment }}
        />
    )
}

export { CustomizedTextField as default }