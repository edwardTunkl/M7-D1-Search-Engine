import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import favouritesReducer from "../reducers/favourites";
import jobsReducer from "../reducers/jobs";
import searchReducer from "../reducers/search";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  search: {
    query: "",
    searchBy: "",
  },
  favourites: {
    companies: [],
  },
  jobs: {
    jobResults: [],
    isError: false,
    isLoading: false,
  },
};

const persistConfig = {
  key: 'root',
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY,
      // the secret key will be used for encrypt/decrypt the stringified version of your redux
      // store saved in the engine of choice
      onError: (error) => {
        console.log(error)
      },
    }),
  ],
}

const totalReducer = combineReducers({
  favourites: favouritesReducer,
  jobs: jobsReducer,
  search: searchReducer
});

const persistedReducer = persistReducer(persistConfig, totalReducer)

const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(configureStore)

export { configureStore, persistor }