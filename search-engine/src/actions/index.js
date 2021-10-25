export const ADD_FAVOURITE_COMPANY = "ADD_FAVOURITE_COMPANY";
export const REMOVE_FAVOURITE_COMPANY = "REMOVE_FAVOURITE_COMPANY";
export const GET_JOBS = "GET_JOBS";
export const GET_JOBS_ERROR = 'GET_JOBS_ERROR'
export const GET_JOBS_LOADING = 'GET_JOBS_LOADING'
export const SET_SEARCH = 'SET_SEARCH'
export const SET_SEARCH_BY = 'SET_SEARCH_BY'


export const addFavouriteAction = (company) => ({
  type: ADD_FAVOURITE_COMPANY,
  payload: company,
});

export const removeFavouriteAction = (index) => ({
  type: REMOVE_FAVOURITE_COMPANY,
  payload: index,
});

export const getJobsAction = (searchBy, search) => {

  return async (dispatch, getState) => {
    const query = await getState()
    console.log(".....FETCHING JOBS");
    console.log("QUERY", query)
    dispatch({
      type: GET_JOBS_LOADING,
      payload: true,
    });
    try {
      let resp = await fetch(
        `https://strive-jobs-api.herokuapp.com/jobs?${query.search.searchBy.toLowerCase()}=${query.search.query.toLowerCase()}`
      );
      if (resp.ok) {
        let data = await resp.json();
        let jobs = data.data
        console.log("LETS SEE WHAT WE HAVE GOT", jobs)
        dispatch({
          type: GET_JOBS,
          payload: jobs,
        });
        dispatch({
          type: GET_JOBS_ERROR,
          payload: false,
        });
        dispatch({
          type: GET_JOBS_LOADING,
          payload: false,
        });
      } else {
        console.log("error");
        dispatch({
          type: GET_JOBS_ERROR,
          payload: true,
        });
        dispatch({
          type: GET_JOBS_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_JOBS_ERROR,
        payload: true,
      });
      dispatch({
        type: GET_JOBS_LOADING,
        payload: false,
      });
    }
  };
};
export const setQueryAction = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: value,
    });
  };
};

export const setSearchByAction = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SEARCH_BY,
      payload: value
    })
  }
}