import { ADD_FAVOURITE_COMPANY} from '../actions'
import { REMOVE_FAVOURITE_COMPANY } from '../actions'
import { initialState } from '../store'

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVOURITE_COMPANY: {
      return {
        //DONT USE MUTATING ARRAY METHODS
        ...state,
        favourites: {
          ...state.favourites,
           companies: [...state.favourites.companies, action.payload],
          //companies: state.favourites.companies.concat(action.payload),
          
        },
      }
    }
    case REMOVE_FAVOURITE_COMPANY: {
      return {
        //DONT USE MUTATING ARRAY METHODS
        ...state,
        favourites: {
          ...state.favourites,
           companies: state.favourites.companies.filter((company, index) => index !== action.payload)
          //companies: state.favourites.companies.concat(action.payload),
          
        },
      }
    }

    default:
      return state
  }
}

export default mainReducer