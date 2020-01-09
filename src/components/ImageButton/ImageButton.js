import React, {Fragment, createRef, useState} from 'react'
import ReactCrop from 'react-image-crop'
import imageTools from './imageTools'
import 'react-image-crop/dist/ReactCrop.css'

import IconButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Done from '@material-ui/icons/Done'
import Cancel from '@material-ui/icons/Cancel'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}))

const ImageButton = (props) => {

    const imagePreviewCanvas = createRef()
    const inputRef = createRef()
    const [crop, setCrop] = useState({ aspect: 1 })
    const [dialogOpen, setDialogOpen] = useState(false)
    const classes = useStyles()

    const handleChange = (e) => {
        const file = e.target.files[0]
        props.onChange({ url: URL.createObjectURL(file),ext: file.type })
        setDialogOpen(true)
    }

    const handleClose = () => {
        props.reset
        setDialogOpen(false)
        setCrop({ aspect: 1 })
        inputRef.current.value = null
    }

    const handleConfirm = () => {
        const canvasRef = imagePreviewCanvas.current
        const image64data = canvasRef.toDataURL(props.image.ext)
        const croppedImgFile = getFile(image64data, `previewImage${props.image.ext}`)
        imageTools.resize(croppedImgFile, { width: 1000, height: 1000 }, (blob, didItResize) => {
            props.getBlob(blob)
            setDialogOpen(false)
        })
    }

    const getCrop = (canvas, image64, pixelCrop) => {
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
        const ctx = canvas.getContext('2d')
        const image = new Image()
        image.src = image64
        image.onload = function () {
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            )
        }
    }

    const getFile = (base64string, filename) => {
        var arr = base64string.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: mime})
    }

    const onComplete = (crop, pixelCrop) => {
        getCrop(imagePreviewCanvas.current, props.image.url, pixelCrop)
    }

    return (
        <Fragment>
            <input
                ref={inputRef}
                accept='image/x-png, image/png, image/jpg, image/jpeg'
                multiple={false}
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={e => handleChange(e)}
            />
            <label htmlFor="icon-button-file">
                <IconButton
                    color="primary"
                    className={classes.button}
                    aria-label="Upload picture"
                    component="span"
                >
                    <PhotoCamera />
                </IconButton>
            </label>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Image Crop</DialogTitle>
                <DialogContent>
                    <ReactCrop
                        src={props.image.url}
                        crop={crop}
                        onChange={(crop) => setCrop(crop)}
                        onComplete={onComplete}
                    />
                    <canvas hidden={true} ref={imagePreviewCanvas}></canvas>
                </DialogContent>
                <DialogActions>
                    <label htmlFor="confirm-dialog">
                        <IconButton
                            color="primary"
                            className={classes.button}
                            aria-label="confirm-dialog"
                            component="span"
                            onClick={handleConfirm}
                        >
                            <Done />
                        </IconButton>
                    </label>
                    <label htmlFor="close-dialog">
                        <IconButton
                            color="primary"
                            className={classes.button}
                            aria-label="close-dialog"
                            component="span"
                            onClick={handleClose}
                        >
                            <Cancel />
                        </IconButton>
                    </label>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export { ImageButton as default }