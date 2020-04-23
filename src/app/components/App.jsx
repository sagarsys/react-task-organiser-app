import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { store } from '../store'
import { ConnectedDashboard } from './Dashboard'
import { history } from '../store/history'
import { ConnectedNavigation } from './Navigation'

export const App = () => (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavigation />
          <Route exact path="/dashboard" render={() => <ConnectedDashboard />}/>
        </div>
      </Provider>
    </Router>
)

export default App
