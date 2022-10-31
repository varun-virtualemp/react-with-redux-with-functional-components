import './App.css'
import { Suspense } from 'react'
import { createStore ,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

import reducer from './store/rootReducer'
import MainRoute from './routes/MainRoute'
import { Loader } from './components'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'font-awesome/css/font-awesome.min.css'


function App() {
    const store = createStore(reducer, applyMiddleware(thunk));

    return (
        <Provider store={store}>
            <Suspense fallback={<Loader />}>
                <MainRoute />
            </Suspense>
        </Provider>
    )
}

export default App