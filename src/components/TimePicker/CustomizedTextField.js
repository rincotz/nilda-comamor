import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'

const CustomizedTextField = ({ isInvalid, InputProps, ...props }) => {
    const invalid = isInvalid(props.value)
    let endAdornment

    if (props.value === '') {
        endAdornment = null
    } else if (!invalid) {
        endAdornment = (
            <InputAdornment position='end'>
                <CheckCircleIcon color='primary' />
            </InputAdornment>
        )
    } else {
        endAdornment = (
            <InputAdornment position='end'>
                <ErrorIcon color='error' />
            </InputAdornment>
        )
    }

    return (
        <TextField
            {...props}
            error={!!invalid}
            helperText={invalid}
            InputProps={{ ...InputProps, endAdornment }}
        />
    )
}

export { CustomizedTextField as default }