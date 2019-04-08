const initialState = {
  user: ""
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":{
      console.log("check box?", action.payload.user)
      return {...state, user: action.payload.user}
    }
    case "CREATE":
    return state
    default:
      return state
  }
}

export default reducer
