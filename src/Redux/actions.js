const addUser = (user) => ({ type: 'ADD_USER', payload: user })
const setProject = (project) => ({type: 'ADD_PROJECT', payload: project})
const setList = (list) => ({type: 'ADD_LIST', payload: list})
const port = "https://keeptrack-jg.herokuapp.com"
export const logout = () => ({type: 'REMOVE_USER', payload:null})
export const getUser = (token) => {
  return dispatch => {
  return fetch(`${port}/api/v1/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
      .then(currentUser => dispatch(addUser(currentUser)))
      .catch(console.error)
    }
  }

  export const login = (user) => {
      return dispatch => {
        fetch(`${port}/api/v1/login`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accepts: "application/json",
          },
          body: JSON.stringify({ user })
        })
          .then(resp => resp.json())
          .then(currentUser => {
            if(currentUser.jwt){
              localStorage.token = currentUser.jwt;
              return dispatch(getUser(currentUser.jwt))
            }
          })
          .catch(console.error)
        }
      }
export const reminderChanger = (reminder, token) => {
  return dispatch => {
    fetch(`${port}/api/v1/reminders`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        reminder
      })
    })
    .then(resp => resp.json())
    .then(currentUser => {
      if(currentUser){
        return dispatch(addUser(currentUser))
      }
    })
    .catch(console.error)
  }
}
export const postUser = (user) => {
  return dispatch => {
    fetch(`${port}/api/v1/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({user})
})
  .then(res => res.json())
  .then(currentUser => {
    if(currentUser.jwt){
      localStorage.token = currentUser.jwt;
      return dispatch(getUser(currentUser.jwt))
    }
  })
  .catch(console.error)
  }
}
export const changeNotification = (id, type, token) => {
  return dispatch => {
    fetch(`${port}/api/v1/notifications`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({reminder: {id, type}})
    })
    .then(resp => resp.json())
    .then(currentUser => {
      if(currentUser){
        return dispatch(addUser(currentUser))
      }
    })
    .catch(console.error)
  }
}
export const addReminder = (token) => {
  return dispatch => {
    fetch(`${port}/api/v1/new-reminder`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
      .then(currentUser => dispatch(addUser(currentUser)))
      .catch(console.error)
    }
  }
  export const removeReminder = (token, id) => {
    return dispatch => {
      fetch(`${port}/api/v1/reminders`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({reminder: {id}})
      })
      .then(resp => resp.json())
      .then(currentUser => {
        if(currentUser){
          return dispatch(addUser(currentUser))
        }
      })
      .catch(console.error)
    }
  }
  export const getProject = (project, token) => {
    return dispatch => {
      console.log("THIS MUST BE THE PROJECT", project)
      fetch(`${port}/api/v1/project`, {
        method: 'GET',
        headers:{
          Project: `${project}`,
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => resp.json())
      .then(currentProject => {
        if(currentProject){
          return dispatch(setProject(currentProject))
        }
      })
      .catch(console.error)
      }
  }
  export const newList = (title) => {
    return dispatch => {
      fetch(`${port}/api/v1/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({list: {title: title, project: localStorage.currentProject}})
      })
      .then(res => res.json())
      .then(currentProject => {
        if(currentProject){
          return dispatch(setProject(currentProject))
        }
      })
      .catch(console.error)
    }
  }
  export const getList = (list, project) => {
    return dispatch => {
      fetch(`${port}/api/v1/list`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
            Project: `${project}`,
            List: `${list}`
        }
      })
      .then(res => res.json())
      .then(currentList => {
        if(currentList){
          return dispatch(setList(currentList))
        }
      })
      .catch(console.error)
    }
  }
  export const addColumn = (id) => {
    return dispatch => {
      fetch(`${port}/api/v1/list/column`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({list: {id: id, project: localStorage.currentProject}})
      })
      .then(res => res.json())
      .then(currentList => {
        if(currentList){
          return dispatch(setList(currentList))
        }
      })
      .catch(console.error)
    }
  }
  export const addRow = (id) => {
    return dispatch => {
      fetch(`${port}/api/v1/list/row`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({list: {id: id, project: localStorage.currentProject}})
      })
      .then(res => res.json())
      .then(currentList => {
        if(currentList){
          return dispatch(setList(currentList))
        }
      })
      .catch(console.error)
    }
  }
  export const deleteRow = (id, row) => {
    return dispatch => {
      fetch(`${port}/api/v1/list/row`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({list: {id: id, project: localStorage.currentProject, row: row}})
      })
      .then(res => res.json())
      .then(currentList => {
        if(currentList){
          return dispatch(setList(currentList))
        }
      })
      .catch(console.error)
    }
  }
  export const deleteColumn = (id, column) => {
    return dispatch => {
      fetch(`${port}/api/v1/list/column`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({list: {id: id, project: localStorage.currentProject, column: column}})
      })
      .then(res => res.json())
      .then(currentList => {
        if(currentList){
          return dispatch(setList(currentList))
        }
      })
      .catch(console.error)
    }
  }
  export const changeInfo = (id, type, text, type_id) => {
    return dispatch => {
      fetch(`${port}/api/v1/list/info`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({list: {id: id, project: localStorage.currentProject, text: text, type: type, type_id}})
      })
      .then(res => res.json())
      .then(currentList => {
        if(currentList){
          return dispatch(setList(currentList))
        }
      })
      .catch(console.error)
    }
  }
  export const deleteList = (id) => {
    return dispatch => {
      fetch(`${port}/api/v1/list`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({list: {id: id, project: localStorage.currentProject}})
      })
      .then(res => res.json())
      .then(currentProject => {
        if(currentProject){
          return dispatch(setProject(currentProject))
        }
      })
      .catch(console.error)
    }
  }
  export const projectChanger = (project) => {
    return dispatch => {
      fetch(`${port}/api/v1/project`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({project})
      })
      .then(res => res.json())
      .then(currentUser => {
        if(currentUser){
          return dispatch(addUser(currentUser))
        }
      })
      .catch(console.error)
    }
  }
  export const postProject = (title) => {
    return dispatch => {
      fetch(`${port}/api/v1/project`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({project: {title}})
        }
      )
      .then(res => res.json())
        .then(currentProject => {
          if(currentProject){
            localStorage.currentProject = currentProject.id
            return dispatch(setProject(currentProject))
          }
        })
        .catch(console.error)
      }
    }
