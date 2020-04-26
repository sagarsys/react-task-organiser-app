import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { store } from '../store'
import { history } from '../store/history'
import { RouteGuard } from './RouteGuard'
import { ConnectedNavigation } from './Navigation'
import { ConnectedDashboard } from './Dashboard'
import { ConnectedTaskDetail } from './TaskDetail'
import { ConnectedLogin } from './Login'

const { Content } = Layout

export const App = () => (
  <Router history={history}>
    <Provider store={store}>
      <Layout>
        <ConnectedNavigation />
        <Content className="container mt-4">
          <Route exact path="/" component={ConnectedLogin} />
          <Route
            exact
            path="/dashboard"
            render={RouteGuard(ConnectedDashboard)}
          />
          <Route
            exact
            path="/task/:id"
            render={RouteGuard(ConnectedTaskDetail)}
          />
        </Content>
      </Layout>
    </Provider>
  </Router>
)

export default App
