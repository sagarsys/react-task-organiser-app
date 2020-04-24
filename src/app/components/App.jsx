import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { store } from '../store'
import { ConnectedDashboard } from './Dashboard'
import { history } from '../store/history'
import { ConnectedNavigation } from './Navigation'
import { ConnectedTaskDetail } from './TaskDetail'

export const App = () => (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavigation />
          <Route exact path="/dashboard" render={() => (<ConnectedDashboard />)} />
          <Route exact path="/task/:id" render={({ match}) => (<ConnectedTaskDetail match={match} />)} />
        </div>
      </Provider>
    </Router>
)

export default App
