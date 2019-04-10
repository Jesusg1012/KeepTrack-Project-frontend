const initialState = {
  user: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":{
      console.log(action.payload.user)
      return {...state, user: action.payload.user}
    }
    case "REMOVE_USER":{
      return {...state, user: null}
    }
    default:
      return state
  }
}

export default reducer
