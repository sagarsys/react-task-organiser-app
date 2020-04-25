import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { store } from '../store'
import { ConnectedDashboard } from './Dashboard'
import { history } from '../store/history'
import { RouteGuard } from './RouteGuard'
import { ConnectedNavigation } from './Navigation'
import { ConnectedTaskDetail } from './TaskDetail'
import { ConnectedLogin } from './Login'

export const App = () => (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavigation />
          <Route exact path="/" component={ConnectedLogin} />
          <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
          <Route exact path="/task/:id" render={RouteGuard(ConnectedTaskDetail)} />
        </div>
      </Provider>
    </Router>
)

export default App
