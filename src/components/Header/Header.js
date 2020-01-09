import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux'
import { auth, firebase } from "../../firebase/firebase"
import LoginDialog from '../LoginDialog/LoginDialog'
import { startLogin, startLogout, isLoggedIn } from '../../actions/auth'
import { startSetPartner } from '../../actions/partners'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header= (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    let [isLoggedIn, setLogin] = useState(false)
    useEffect(() => {
        isLoggedIn = auth.onAuthStateChanged(user => {
            if (user) {
                props.startSetPartner(user.uid)
                setLogin(true)
            } else {
                setLogin(false)
            }
        })
    })

    return (
        <Fragment>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            .comAmor
                        </Typography>
                        {
                            isLoggedIn
                                ? (
                                    <Button
                                        color="inherit"
                                        onClick={() => props.startLogout()}
                                    >
                                        sair
                                    </Button>
                                )
                                : (
                                    <Button
                                        color="inherit"
                                        onClick={() => setOpen(true) }
                                    >
                                        entrar
                                    </Button>
                                )
                        }
                    </Toolbar>
                </AppBar>
            </div>
            <LoginDialog
                open={open}
                startLogin={(login, password) => props.startLogin(login, password)}
                setOpen={() => setOpen(true)}
                setClose={() => setOpen(false)}
            />
        </Fragment>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (login, password) => dispatch(startLogin(login, password)),
    startLogout: () => dispatch(startLogout()),
    isLoggedIn: () => dispatch(isLoggedIn()),
    startSetPartner: (partnerUID) => dispatch(startSetPartner(partnerUID))
})

export default connect(undefined, mapDispatchToProps)(Header)