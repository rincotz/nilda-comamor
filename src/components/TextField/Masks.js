import MaskedInput from 'react-text-mask'
import React from 'react'

const BirthInput = ({ inputRef, ...props }) => (
    <MaskedInput
        {...props}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /\d/, '/', /[0-9]/, /\d/, '/', /[0-9]/, /\d/, /\d/, /\d/]}
    />
)

const PhoneInput = ({ inputRef, ...props }) => (
    <MaskedInput
        {...props}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/,]}
    />
)

const IdInput = ({ inputRef, ...props }) => (
    <MaskedInput
        {...props}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /\d/, /\d/, '.', /[0-9]/, /\d/, /\d/, '.', /[0-9]/, /\d/, /\d/, '-', /[0-9]/, /\d/]}
    />
)

const ZipInput = ({ inputRef, ...props }) => (
    <MaskedInput
        {...props}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /\d/, '.', /[0-9]/, /\d/, /\d/, '-', /[0-9]/, /\d/, /\d/]}
    />
)

const PriceInput = ({ inputRef, ...props }) => (
    <MaskedInput
        {...props}
        ref={ref => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={['R', '$', ' ', /[1-9]/, /\d/]}
    />
)

export { BirthInput, PhoneInput, IdInput, ZipInput, PriceInput }