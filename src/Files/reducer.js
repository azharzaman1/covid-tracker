export const initialState = {
  currentUser: null,
  fetchedUserDetails: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    default:
      return state;

    case "SET_FETCHED_DETAILS":
      return {
        ...state,
        fetchedUserDetails: action.fetchedData,
      };
  }
};

export default reducer;
