import React from 'react'
import { connect } from 'react-redux'

export const Username = ({ username }) => <>{username}</>

const mapStateToProps = (state) => {
  const { id } = state.session
  return {
    username: state.users.find((user) => user.id === id).name,
  }
}

export const ConnectedUsername = connect(mapStateToProps)(Username)
