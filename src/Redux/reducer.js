const initialState = {
  user: ""
}

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_USER":{
      return {...state, user: action.payload.user}
    }
    case "CREATE":
    return state
    default:
      return state
  }
}

export default reducer
