const initialState = {
  user: ""
}

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "NONE":
    return state
    case "CREATE":
    return state
    default:
      return state
  }
}

export default reducer
