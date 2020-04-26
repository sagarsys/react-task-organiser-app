import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Space, Layout, Row, Col, Card } from 'antd'
import * as mutations from '../store/mutations'

export const Login = ({ authenticated, authenticateUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Card title="Login" className="w-100 login">
      <form>
        <Space direction="vertical" className="w-100">
          <Input
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {authenticated === mutations.NOT_AUTHENTICATED && (
            <p>Incorrect login details</p>
          )}
          <Button
            type="primary"
            className="center-block"
            loading={authenticated === mutations.AUTHENTICATING}
            onClick={() => authenticateUser(username, password)}
          >
            Login
          </Button>
        </Space>
      </form>
    </Card>
  )
}

const mapStateToProps = ({ session: { authenticated } }) => ({
  authenticated,
})

const mapDispatchToProps = (dispatch) => ({
  authenticateUser(username, password) {
    if (!username || !password) return
    dispatch(mutations.requestUserAuthentication(username, password))
  },
})

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
