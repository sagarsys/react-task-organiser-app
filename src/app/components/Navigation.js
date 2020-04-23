import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export const Navigation = () => (
    <div>
      <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
    </div>
)

export const ConnectedNavigation = connect(state => state)(Navigation)
