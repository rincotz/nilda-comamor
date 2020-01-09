import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { history } from './AppRouter'

export const RequireID = ({
                                 uid,
                                 component: Component,
                                 ...rest
                             }) => {
    return(
        <Route {...rest} component={(props) => {
            if (props.uid === props.match.params.uid) {
                console.log(history, 'history')
                console.log(props, 'props')
                return (
                    <Redirect to={`/usuarios/${uid}`} />
                )
            } else {
                return (
                    <Redirect to='/' />
                )
            }
        }} />
)}

const mapStateToProps = (state) => ({
    uid: state.partner.uid
})

export default connect(mapStateToProps)(RequireID)