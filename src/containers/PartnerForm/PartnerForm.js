import React, { useState } from 'react';
import moment from 'moment'
import validateId from 'validar-cpf'
import Geocode from 'react-geocode'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Home from '@material-ui/icons/Home'
import HomeOutlined from '@material-ui/icons/HomeOutlined'
import CardTravel from '@material-ui/icons/CardTravel'
import CardTravelOutlined from '@material-ui/icons/CardTravelOutlined'
import Spa from '@material-ui/icons/Spa'
import SpaOutlined from '@material-ui/icons/SpaOutlined'
import FilterVintage from '@material-ui/icons/FilterVintage'
import FilterVintageOutlined from '@material-ui/icons/FilterVintageOutlined'

import { firebase, auth, GeoPoint, storage } from "../../firebase/firebase"
import CustomizedSnackbar from '../../components/Snackbar/CustomizedSnackbar'
import CustomizedTextField from '../../components/TextField/CustomizedTextField'
import ImageButton from '../../components/ImageButton/ImageButton'
import { BirthInput, PhoneInput, IdInput, ZipInput } from '../../components/TextField/Masks'

const useStyles = makeStyles(theme => ({
    container: { margin: theme.spacing(2) }
}))

const storageRef = firebase.storage().ref()

Geocode.setApiKey('AIzaSyDACrwFvunhAWvGWP1D6pMEXCXgUuhN3RM')
Geocode.enableDebug()

const PartnerForm = (props) => {
    const classes = useStyles()
    const [error, setError] = useState('')
    const [snackbar, setSnackbarOpen] = useState(false)
    const [profileImage, setProfileImage] = useState({url: '', ext: ''})
    const [blob, setBlob] = useState('')
    const [radios, setRadios] = useState([
        {
            id: 'nationality',
            label: 'nacionalidade',
            value: props.partner ? props.partner.nationality : 'brasileira',
            options: [{
                value: 'brasileira',
                icon: <HomeOutlined/>,
                checkedIcon: <Home/>
            }, {
                value: 'estrangeira',
                icon: <CardTravelOutlined/>,
                checkedIcon: <CardTravel/>
            }]
        },
        {
            id: 'gender',
            label: 'sexo',
            value: props.partner ? props.partner.gender : 'feminino',
            options: [{
                value: 'feminino',
                icon: <FilterVintageOutlined/>,
                checkedIcon: <FilterVintage/>
            }, {
                value: 'masculino',
                icon: <SpaOutlined/>,
                checkedIcon: <Spa/>
            }]
        }
    ])
    const [inputs, setInputs] = useState([
        {
            id: 'name',
            label: 'nome',
            placeholder: 'Maria Aparecida Santos',
            value: props.partner ? props.partner.name : '',
            isInvalid: value => value === '' || /^[A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ']+$/.test(value)
                ? '' : 'Nome inválido'
        },
        {
            id: 'birth',
            label: 'nascimento',
            InputProps: BirthInput,
            placeholder: '24/05/1967',
            value: props.partner ? moment(props.partner.birth*1000).format('DD/MM/YYYY') : '',
            isInvalid: value => value === '' ||
                moment(value, 'DD/MM/YYYY', true).isSameOrBefore(moment.utc().subtract(18, 'years')) ||
                moment(value, 'DD/MM/YY', true).isSameOrBefore(moment.utc().subtract(18, 'years'))
                ? '' : 'Você deve ter pelo menos 18 anos. Peça ajuda ao responsável mais próximo'
        },
        {
            id: 'email',
            label: 'e-mail',
            placeholder: 'seu_email@exemplo.com.br',
            value: props.partner ? props.partner.email : '',
            isInvalid: value => value === '' || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                .test(value)
                ? '' : 'Por favor, insira um endereço de e-mail válido'
        },
        {
            id: 'password',
            label: 'senha',
            type: 'password',
            value: '',
            isInvalid: value => value === '' || /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/.test(value)
                ? '' : 'A senha deve conter 6-20 caracters, ao menos uma letra maiúscula/minúscula e ao menos um caractere especial'
        },
        {
            id: 'id',
            label: 'cpf',
            InputProps: IdInput,
            placeholder: '999.888.777-66',
            value: props.partner ? props.partner.id : '',
            isInvalid: value => value === '' || validateId(value)
                ? '' : 'CPF inválido'
        },
        {
            id: 'phone',
            label: 'celular',
            InputProps: PhoneInput,
            placeholder: '(11) 999 777 555',
            value: props.partner ? props.partner.phone : '',
            isInvalid: value => value === '' || /^(\(?0?([1-9]{2})(\)|\ |-)?(\ |-)?[0-9]{3}(\ |-)?[0-9]{2}\-?[0-9](\ |-)?[0-9]{3})$/.test(value)
                ? '' : 'Por favor, utilize um número de telefone brasileiro com DDD'
        },
        {
            id: 'addressLine1',
            label: 'rua',
            placeholder: 'Rua Francisco dos Santos Xavier',
            value: props.partner ? props.partner.addressLine1 : '',
            isInvalid: value => value === '' || value.length > 5
                ? '' : 'Seu endereço é usado para mostrar refeições próximas a você'
        },
        {
            id: 'number',
            label: 'número',
            placeholder: '245',
            value: props.partner ? props.partner.number : '',
            isInvalid: value => value === '' || /^([1-9]?[0-9]?\.?[0-9]*(-| |\.)?[a-z|A-Z]?)$/.test(value)
                ? '' : 'Indique um número válido para sua residência'
        },
        {
            id: 'addressLine2',
            label: 'complemento',
            placeholder: 'bloco 2, apartamento 25',
            value: props.partner ? props.partner.addressLine2 : '',
            isInvalid: value => value === '' || value.length < 130
                ? '' : 'Você digitou demais, guarde a inspiração para nos contar sua história'
        },
        {
            id: 'neighborhood',
            label: 'bairro',
            placeholder: 'Jardim das Acácias',
            value: props.partner ? props.partner.neighborhood : '',
            isInvalid: value => value === '' || value.length > 2
                ? '' : 'Parece que seu bairro não existe'
        },
        {
            id: 'zip',
            label: 'cep',
            InputProps: ZipInput,
            placeholder: '18120-000',
            value: props.partner ? props.partner.zip : '',
            isInvalid: value => value === '' || /^[0-9]{2}.?[0-9]{3}-?[0-9]{3}$/.test(value)
                ? '' : 'CEP inválido'
        },
        {
            id: 'bio',
            label: 'sua história',
            multiline: true,
            placeholder: 'Fale um pouco sobre você. Todos se interessam por uma boa história.',
            value: props.partner ? props.partner.bio : '',
            isInvalid: value => value === '' || value.length > 15
            ? '' : 'Ainda estamos curiosos, fale um pouco mais sobre você'
        }
    ]);

    const onChange = ({ target: { id, value } }) => {
        const newInputs = [...inputs];
        const index = inputs.findIndex(input => input.id === id);

        newInputs[index] = {
            ...inputs[index],
            value: value
        };

        setInputs(newInputs);
    };

    const onRadioChange = index => ({ target: { value }}) => {
        const newRadios = [...radios]
        const radio = radios[index]

        newRadios[index] = {...radio, value}

        setRadios(newRadios)
    }
    
    const onSubmit = () => {
        inputs.map(input => {
            let message = input.isInvalid(input.value)
            if (message) {
                setError(message)
                setSnackbarOpen(true)
            } else setError('')
        })
        if (!profileImage) {
            setError('Use uma foto de perfil mostrando seu rosto.')
            setSnackbarOpen(true)
            return
        }
        if (error) { return }
        else {
            setError('')
            return auth.createUserWithEmailAndPassword(inputs[2].value, inputs[3].value).then(docRef => {
                const uid = docRef.user.uid
                return storageRef.child(`users/${uid}`).put(blob, { contentType: profileImage.type }).then(snapshot => {
                    snapshot.ref.getDownloadURL().then(url => {
                        const pictureURL = url
                        Geocode.fromAddress(`${inputs[6].value}, ${inputs[7].value}, ${inputs[9].value}, ${inputs[10].value}`).then(response => {
                                const { lat, lng } = response.results[0].geometry.location
                                props.onSubmit({
                                    uid,
                                    nationality: radios[0].value,
                                    gender: radios[1].value,
                                    name: inputs[0].value.toLowerCase(),
                                    birth: moment(inputs[1].value, 'DD-MM-YYYY').valueOf(),
                                    email: inputs[2].value,
                                    id: inputs[4].value.replace(/\D/g, ''),
                                    phone: inputs[5].value.replace(/\D/g, ''),
                                    addressLine1: inputs[6].value.toLowerCase(),
                                    number: inputs[7].value,
                                    addressLine2: inputs[8].value.toLowerCase(),
                                    neighborhood: inputs[9].value.toLowerCase(),
                                    zip: inputs[10].value.replace(/\D/g, ''),
                                    bio: inputs[11].value.toLowerCase(),
                                    geoPoint: new GeoPoint(lat, lng),
                                    picture: pictureURL
                            })
                            }, error => setError(error)
                        )
                    })
                }).catch(error => {
                    setError(error)
                })
            }).catch(reason => {
                const code = reason.code
                const message = reason.message

                switch (code) {
                    case 'auth/email-already-in-use':
                        setError('Este email já encontra-se cadastrado')
                        setSnackbarOpen(true)
                        return
                    case 'auth/invalid-email':
                        setError('e-mail inválido. Tente outro e-mail.')
                        setSnackbarOpen(true)
                        return
                    case 'auth/operation-not-allowed':
                        setError('Por favor tente novamente')
                        setSnackbarOpen(true)
                        return
                    case 'auth/weak-password':
                        setError('A senha deve conter 6-20 caracters, ao menos uma letra maiúscula/minúscula e ao menos um caractere especial')
                        setSnackbarOpen(true)
                        return
                    default:
                        setError(message)
                        setSnackbarOpen(true)
                        return
                }
            })
        }
    }

    return (
        <Grid container spacing={4} className={classes.container}>
            {radios.map((radio, index) => (
                <Grid item key={index}>
                    <FormControl component='fieldset'>
                        <FormLabel component='legend'>{radio.label}</FormLabel>
                        <RadioGroup name={radio.label} value={radio.value} onChange={onRadioChange(index)} row>
                            {radio.options.map((option, index) => (
                                <FormControlLabel
                                    value={option.value}
                                    key={index}
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
                    </FormControl>
                </Grid>
            ))}
            {inputs.map(input => (
                <Grid item key={input.id}>
                    <CustomizedTextField
                        id={input.id}
                        disabled={input.id === 'id' && radios[0].value === 'estrangeira' ? true : false}
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
            <Grid item>
                <ImageButton
                    reset={() => setProfileImage({url: '', ext: ''})}
                    onChange={image => setProfileImage(image)}
                    getBlob={image => setBlob(image)}
                    image={profileImage}
                />
            </Grid>
            <Grid item>
                <CustomizedSnackbar
                    open={snackbar}
                    variant='error'
                    message={error}
                    onClose={() => setSnackbarOpen(false)}
                />
                <Button onClick={onSubmit}>Enviar</Button>
            </Grid>
        </Grid>
    );
}

export { PartnerForm as default }