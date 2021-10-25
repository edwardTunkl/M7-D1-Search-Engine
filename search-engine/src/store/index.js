import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import favouritesReducer from "../reducers/favourites";
import jobsReducer from "../reducers/jobs";
import searchReducer from "../reducers/search";
import thunk from "redux-thunk";

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

const totalReducer = combineReducers({
  favourites: favouritesReducer,
  jobs: jobsReducer,
  search: searchReducer
});
// 2)
const configureStore = createStore(
  totalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default configureStore;
