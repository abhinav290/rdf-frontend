import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import queryModel from './models/QueryModel'
import App from './App'
import { Provider } from 'mobx-react'

const stores = {
    queryModel
}
ReactDOM.render(
    <Provider {...stores}>
        <App/>
    </Provider>,
    document.getElementById('root'))