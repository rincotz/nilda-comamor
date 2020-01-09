import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore'
import CssBaseline from '@material-ui/core/CssBaseline';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'rc-time-picker/assets/index.css'
import './firebase/firebase'
import { startSetMeals } from "./actions/meals";

const store = configureStore()

const jsx = (
    <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </React.Fragment>
)

let hasRendered = false
const renderApp = () => {
    if (hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'))
        hasRendered = true
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetMeals()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'))
})