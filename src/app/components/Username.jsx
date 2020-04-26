import React from 'react'
import { connect } from 'react-redux'

export const Username = ({ username }) => <>{username}</>

const mapStateToProps = (state) => ({
  username: state.session.username,
})

export const ConnectedUsername = connect(mapStateToProps)(Username)
