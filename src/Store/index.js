import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    rootReducer
} from '../Reducers'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['cityList'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    ));
    let persistor = persistStore(store);
    return {store, persistor}
}
