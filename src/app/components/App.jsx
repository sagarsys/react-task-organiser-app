import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { ConnectedDashboard } from './Dashboard'

export const App = () => (
    <Provider store={store}>
      <ConnectedDashboard />
    </Provider>
)

export default App
