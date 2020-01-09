import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const LoginDialog = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = () => {
        props.startLogin(email, password).catch(error => {
            var errorCode = error.code
            var errorMessage = error.message
        }).then(props.setClose)
    }

    return (
        <Dialog open={props.open} onClose={props.setClose} aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Preencha seu email e senha, ou crie uma conta.
                </DialogContentText>
                <TextField
                    autoFocus
                    onChange={e => setEmail(e.target.value)}
                    margin="dense"
                    id="email"
                    label="email"
                    type="email"
                    fullWidth
                />
                <TextField
                    onChange={e => setPassword(e.target.value)}
                    margin="dense"
                    id="password"
                    label="senha"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary">
                    Criar Conta
                </Button>
                <Button onClick={props.setClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={login} color="primary">
                    Entrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginDialog