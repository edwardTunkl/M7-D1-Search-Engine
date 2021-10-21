
export const ADD_FAVOURITE_COMPANY = 'ADD_FAVOURITE_COMPANY'
export const REMOVE_FAVOURITE_COMPANY = 'REMOVE_FAVOURITE_COMPANY' 

export const addFavouriteAction = (company) => ({
type: ADD_FAVOURITE_COMPANY,
payload: company
})
export const removeFavouriteAction = (index) => ({
  type: REMOVE_FAVOURITE_COMPANY,
  payload: index,
})