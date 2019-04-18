const initialState = {
  user: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":{
      return {...state, user: action.payload.user}
    }
    case "REMOVE_USER":{
      return {...state, user: null}
    }
    case "ADD_PROJECT":{
      localStorage.currentProject = action.payload.project.id
      return {...state, project: action.payload.project}
    }
    case 'ADD_LIST':{
      return {...state, list: action.payload.list}
    }
    default:
      return state
  }
}

export default reducer
