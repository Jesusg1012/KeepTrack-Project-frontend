const addUser = (user) => ({ type: 'ADD_USER', payload: user })
export const logout = () => ({type: 'REMOVE_USER', payload:null})
export const getUser = (token) => {
  return dispatch => {
  return fetch("http://localhost:4000/api/v1/profile", {
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
        fetch("http://localhost:4000/api/v1/login", {
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
    fetch('http://localhost:4000/api/v1/reminders', {
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
  }
}
export const postUser = (user) => {
  return dispatch => {
    fetch('http://localhost:4000/api/v1/users', {
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
      return dispatch(addUser(currentUser.user))
    }
  })
  }
}
export const changeNotification = (id, type, token) => {
  return dispatch => {
    fetch('http://localhost:4000/api/v1/notifications', {
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
  }
}
export const addReminder = (token) => {
  return dispatch => {
    fetch('http://localhost:4000/api/v1/new-reminder', {
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
      fetch('http://localhost:4000/api/v1/reminders', {
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
    }
  }
