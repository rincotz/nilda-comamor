import React, { Fragment } from 'react'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButton = (props) => (
    <RadioGroup name={props.id} value={props.value} onChange={props.onChange} row >
        {props.options.map(option => (
            <FormControlLabel
                value={option.value}
                control={
                    <Radio
                        color='primary'
                        icon={option.icon}
                        checkedIcon={option.checkedIcon}
                    />
                }
                label={option.value}
                labelPlacement='bottom'
            />
        ))}
    </RadioGroup>
)

export default RadioButton