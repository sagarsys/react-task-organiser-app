import React from 'react'
import { connect } from 'react-redux'

export const Login = () => (
    <div>Login</div>
)

const mapStateToProps = state => state

export const ConnectedLogin = connect(mapStateToProps)(Login)
