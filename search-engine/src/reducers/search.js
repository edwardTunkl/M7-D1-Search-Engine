import { initialState } from "../store";
import { SET_SEARCH, SET_SEARCH_BY } from "../actions";


export const searchReducer = (state= initialState.search, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        query: action.payload,
      };
    case SET_SEARCH_BY:
      return {
        ...state,
        searchBy: action.payload,
      };

    default:
      return state;
  }
}
export default searchReducer