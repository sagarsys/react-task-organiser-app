import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'antd'
import * as mutations from '../store/mutations'

export const Login = ({ authenticated, authenticateUser }) => {
  const [username, setUsername] = useState('dev')
  const [password, setPassword] = useState('')
  return (
      <div>
        <h2>Login</h2>
        <form>
          <Input placeholder="Username" name="username" value={username}
                 onChange={(e) => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" name="password" value={password}
                 onChange={(e) => setPassword(e.target.value)} />
          {(authenticated === mutations.NOT_AUTHENTICATED) && <p>Incorrect login details</p>}
          <Button type="primary"
                  loading={authenticated === mutations.AUTHENTICATING}
                  onClick={() => authenticateUser(username, password)}>Login</Button>
        </form>
      </div>
  )
}

const mapStateToProps = ({ session: { authenticated }}) => ({
  authenticated
})

const mapDispatchToProps = dispatch => ({
  authenticateUser(username, password) {
    if (!username || !password) return
    dispatch(mutations.requestUserAuthentication(username, password))
  }
})

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
