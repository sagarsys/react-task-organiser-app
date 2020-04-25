import React from 'react'
import { Redirect } from 'react-router'
import { store } from '../store'

export const RouteGuard = Component => ({ match }) => {
  console.log('Route guard', store.getState(), match)
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />
  }
  return <Component match={match} />
}
