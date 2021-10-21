import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import favouritesReducer from '../reducers/favourites'
import jobsReducer from '../reducers/jobs'
import thunk from 'redux-thunk'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const initialState = {
  favourites: {
    companies: [],
  },
  jobs: {
    jobResults:[],
    isError: false,
    isLoading: false,
  }
}

const totalReducer = combineReducers({

  favourites: favouritesReducer,
  jobs: jobsReducer
})
// 2)
const configureStore = createStore(
  totalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

export default configureStore