import React from 'react'

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const CustomCheckbox = ({ values, label, onChange }) => (
    <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup>
            {values.map((value, index) => (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox
                            checked={value.checked}
                            onChange={onChange(index)}
                            icon={value.Icon}
                            checkedIcon={value.CheckedIcon}
                        />
                    }
                    label={value.label}
                />
            ))}
        </FormGroup>
    </FormControl>
)

export { CustomCheckbox as default }