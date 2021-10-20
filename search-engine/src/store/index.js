import { createStore } from 'redux'
import mainReducer from '../reducers'

// 1)
export const initialState = {
  favourites: {
    companies: [],
  }
}

// 2)
const configureStore = createStore(
  mainReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default configureStore