import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import * as mutations from '../store/mutations'
const { Header } = Layout

export const Navigation = ({ authenticated }) => (
  <Header>
    <Menu
      theme="dark"
      mode="horizontal"
      selectable={false}
      selectedKeys={authenticated ? ['2'] : ['1']}
    >
      <Menu.Item key="2">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item
        disabled={authenticated}
        key="1"
        className="right"
        selectable={false}
      >
        <Link to="/">Login</Link>
      </Menu.Item>
    </Menu>
  </Header>
)

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated === mutations.AUTHENTICATED,
})

export const ConnectedNavigation = connect(mapStateToProps)(Navigation)
