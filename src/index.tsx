import React from 'react'
import ReactDOM from 'react-dom'
import { AuthorizationApp } from './AuthorizationApp'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hocs/AuthProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ApiProvider } from './hocs/ApiProvider'
import { BrowserRouter as Router } from 'react-router-dom'

import 'antd/dist/antd.css'
import './index.css'

import { createStore,  Store } from "redux"
import { Provider } from "react-redux"
import { rootReducer } from './__redux/rootReducer'
import { ITask, taskAction } from './types'

const store: Store<ITask[], taskAction> &{
  dispatch: any
} = createStore(rootReducer)

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ApiProvider>
            <AuthProvider>
              <AuthorizationApp />
            </AuthProvider>
          </ApiProvider>
        </BrowserRouter>
      </QueryClientProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
