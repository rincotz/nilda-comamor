import React, { useState, Fragment } from 'react'
import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'

import Kitchen from '@material-ui/icons/Kitchen'
import KitchenOutlined from '@material-ui/icons/KitchenOutlined'
import Motorcycle from '@material-ui/icons/Motorcycle'
import MotorcycleOutlined from '@material-ui/icons/MotorcycleOutlined'
import ShoppingBasket from '@material-ui/icons/ShoppingBasket'
import ShoppingBasketOutlined from '@material-ui/icons/ShoppingBasketOutlined'
import AirlineSeatReclineNormal from '@material-ui/icons/AirlineSeatReclineNormal'
import AirlineSeatReclineNormalOutlined from '@material-ui/icons/AirlineSeatReclineNormalOutlined'
import AlarmOn from '@material-ui/icons/AlarmOn'
import AlarmOff from '@material-ui/icons/AlarmOff'

import { firebase, storage } from "../../firebase/firebase"
import CustomizedSnackbar from '../../components/Snackbar/CustomizedSnackbar'
import CustomizedTextField from '../../components/TextField/CustomizedTextField'
import TimePicker from '../../components/TimePicker/TimePicker'
import ImageButton from '../../components/ImageButton/ImageButton'
import { PriceInput } from '../../components/TextField/Masks'

const useStyles = makeStyles(theme => ({
    container: { margin: theme.spacing(2) },
    textField: { margin: theme.spacing(1) }
}))

const MealForm = (props) => {
    console.log(props.partner)
    const classes = useStyles()
    const [error, setError] = useState('')
    const [snackbar, setSnackbarOpen] = useState(false)
    const [frozen, setFrozen] = useState(false)
    const [courrier, setCourrier] = useState(false)
    const [courrierStart, setCourrierStart] = useState('')
    const [courrierEnd, setCourrierEnd] = useState('')
    const [pickUp, setPickUp] = useState(false)
    const [pickUpStart, setPickUpStart] = useState('')
    const [pickUpEnd, setPickUpEnd] = useState('')
    const [table, setTable] = useState(false)
    const [tableStart, settableStart] = useState('')
    const [tableEnd, setTableEnd] = useState('')
    const [mealImage, setMealImage] = useState('')
    const [blob, setBlob] = useState('')
    const [inputs, setInputs] = useState([
        {
            id: 'name',
            label: 'nome do prato',
            placeholder: 'Pê-efe de frango empanado',
            value: props.meal ? props.meal.name : '',
            isInvalid: value => value === '' || value.length > 3
                ? '' : 'Este é o nome do prato que as pessoas verão'
        },
        {
            id: 'description',
            label: 'descrição',
            multiline: true,
            placeholder: 'Filé de frango empanado frito, acompanhado de arroz, feijões, farofa de miúdos e salada de alfaces',
            value: props.meal ? props.meal.description : '',
            isInvalid: value => value === '' || value.length > 15
                ? '' : 'Ainda estamos curiosos, fale um pouco mais sobre seu prato, ingredientes, acompanhamentos, técnicas e temperos'
        },
        {
            id: 'price',
            label: 'valor',
            placeholder: 'R$ 13',
            InputProps: PriceInput,
            value: props.meal ? (props.meal.price / 100).toString() : '',
            isInvalid: value => value === '' || /(^R\$\s[1-9])\d?/.test(value)
                ? '' : 'Insira um valor para o prato (sem centavos)'
        },
        {
            id: 'available',
            type: 'number',
            label: 'pratos disponíveis',
            placeholder: '3',
            value: props.meal ? props.meal.available : '',
            isInvalid: value => value === '' || /^[1-9]\d?$/.test(value)
                ? '' : 'Insira o número de refeições disponíveis (1 - 99)'
        }
    ])

    const onChange = ({ target: { id, value } }) => {
        const newInputs = [...inputs]
        const index = inputs.findIndex(input => input.id === id)

        newInputs[index] = {
            ...inputs[index],
            value: value
        }

        setInputs(newInputs)
    }

    const onSubmit = () => {
        if (!inputs[0].value || !inputs[1].value || !inputs[2].value || !inputs[3].value) {
            setError('preencha todos os campos')
            setSnackbarOpen(true)
        } else if (!courrier && !pickUp && !table) {
            setError('como as pessoas irão consumir sua refeição? escolha uma opção')
            setSnackbarOpen(true)
        }  else if (courrier && (!courrierStart || !courrierEnd)) {
            setError('selecione o período disponível para entrega')
            setSnackbarOpen(true)
        } else if (table && (!tableStart || !tableEnd)) {
            setError('selecione período disponível para servir em sua casa')
            setSnackbarOpen(true)
        } else if (pickUp && (!pickUpStart || !pickUpEnd)) {
            setError('selecione período disponível para retirada')
            setSnackbarOpen(true)
        } else {
            setError('')
            firebase.storage().ref().child(`meals/${props.partner.uid}/`).put(blob, { contentType: mealImage.type }).then(snapshot => {
                snapshot.ref.getDownloadURL().then((url) => {
                    props.onSubmit({
                        name: inputs[0].value.toLowerCase(),
                        description: inputs[1].value.toLowerCase(),
                        price: parseInt(inputs[2].value.replace(/\D/g, '')),
                        available: parseInt(inputs[3].value),
                        location: props.partner.geoPoint,
                        chef: props.partner,
                        courrier,
                        courrierStart: courrierStart ? moment(courrierStart, 'hh:mm').valueOf() : '',
                        courrierEnd: courrierEnd ? moment(courrierEnd, 'hh:mm').valueOf() : '',
                        pickUp,
                        pickUpStart: pickUpStart ? moment(pickUpStart, 'hh:mm').valueOf() : '',
                        pickUpEnd: pickUpEnd ? moment(pickUpEnd, 'hh:mm').valueOf() : '',
                        table,
                        tableStart: tableStart ? moment(tableStart, 'hh:mm').valueOf() : '',
                        tableEnd: tableEnd ? moment(tableEnd, 'hh:mm').valueOf() : '',
                        frozen,
                        picture: url
                    })
                })
            })
        }
    }

    return (
        <Fragment>
            {inputs.map(input => (
                <Grid item key={input.id}>
                    <CustomizedTextField
                        id={input.id}
                        disabled={input.disabled}
                        type={input.type}
                        multiline={input.multiline}
                        InputProps={{ inputComponent: input.InputProps }}
                        label={input.label}
                        placeholder={input.placeholder}
                        value={input.value}
                        onChange={onChange}
                        isInvalid={input.isInvalid}
                    />
                </Grid>
            ))}
            <FormControl component="fieldset">
                <FormLabel component="legend">Opções de consumo</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={frozen}
                                onChange={() => setFrozen(!frozen)}
                                icon={<KitchenOutlined />}
                                checkedIcon={<Kitchen />}
                            />
                        }
                        label='congelado?'
                    />
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={courrier}
                                    onChange={() => setCourrier(!courrier)}
                                    icon={<MotorcycleOutlined />}
                                    checkedIcon={<Motorcycle />}
                                />
                            }
                            label='entrega?'
                        />
                        <TimePicker
                            value={courrierStart}
                            disabled={!courrier}
                            onChange={e => setCourrierStart(e.target.value)}
                            label={<AlarmOn />}
                            className={classes.textField}
                            isInvalid={(time) => time === '' || moment.utc().isSameOrBefore(moment(time, 'hh:mm')) ? '' : 'O horário de início de atendimento não pode estar no passado'}
                        />
                        <TimePicker
                            value={courrierEnd}
                            disabled={!courrier}
                            onChange={e => setCourrierEnd(e.target.value)}
                            label={<AlarmOff />}
                            className={classes.textField}
                            isInvalid={(time) => time === '' || moment(time, 'hh:mm').isAfter(moment(courrierStart, 'hh:mm')) ? '' : 'O horário de término precisa ser posterior ao horário de início'}
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={pickUp}
                                    onChange={() => setPickUp(!pickUp)}
                                    icon={<ShoppingBasketOutlined />}
                                    checkedIcon={<ShoppingBasket />}
                                />
                            }
                            label='retirada?'
                        />
                        <TimePicker
                            value={pickUpStart}
                            disabled={!pickUp}
                            onChange={e => setPickUpStart(e.target.value)}
                            label={<AlarmOn />}
                            className={classes.textField}
                            isInvalid={(time) => time === '' || moment.utc().isSameOrBefore(moment(time, 'hh:mm')) ? '' : 'O horário de início de atendimento não pode estar no passado'}
                        />
                        <TimePicker
                            value={pickUpEnd}
                            disabled={!pickUp}
                            onChange={e => setPickUpEnd(e.target.value)}
                            label={<AlarmOff />}
                            className={classes.textField}
                            isInvalid={(time) => time === '' || moment(time, 'hh:mm').isAfter(moment(pickUpStart, 'hh:mm')) ? '' : 'O horário de término precisa ser posterior ao horário de início'}
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={table}
                                    onChange={() => setTable(!table)}
                                    icon={<AirlineSeatReclineNormalOutlined />}
                                    checkedIcon={<AirlineSeatReclineNormal />}
                                />
                            }
                            label='lugar a mesa?'
                        />
                        <TimePicker
                            value={tableStart}
                            disabled={!table}
                            onChange={e => settableStart(e.target.value)}
                            label={<AlarmOn />}
                            className={classes.textField}
                            isInvalid={(time) => time === '' || moment.utc().isSameOrBefore(moment(time, 'hh:mm')) ? '' : 'O horário de início de atendimento não pode estar no passado'}
                        />
                        <TimePicker
                            value={tableEnd}
                            disabled={!table}
                            onChange={e => setTableEnd(e.target.value)}
                            label={<AlarmOff />}
                            className={classes.textField}
                            isInvalid={(time) => time === '' || moment(time, 'hh:mm').isAfter(moment(tableEnd, 'hh:mm')) ? '' : 'O horário de término precisa ser posterior ao horário de início'}
                        />
                    </Grid>
                </FormGroup>
            </FormControl>
            <Grid item>
                <ImageButton
                    reset={() => setMealImage('')}
                    onChange={image => setMealImage(image)}
                    getBlob={image => setBlob(image)}
                    image={mealImage}
                />
            </Grid>
            <Grid item>
                <Button onClick={onSubmit}>Enviar</Button>
            </Grid>
            <CustomizedSnackbar
                open={snackbar}
                variant='error'
                message={error}
                onClose={() => setSnackbarOpen(false)}
            />
        </Fragment>
    )
}

export { MealForm as default }