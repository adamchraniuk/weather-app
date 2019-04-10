import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import store from './Store'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store().store}>
        <PersistGate
            loading={null}
            persistor={store().persistor}
        >
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
