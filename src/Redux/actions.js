const addUser = (user) => ({ type: 'ADD_USER', payload: user })

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
              console.log("THIS DAM ERROR:", currentUser)
              localStorage.token = currentUser.jwt;
              return dispatch(addUser(currentUser.user))
            }
          })
          .catch(console.error)
        }
      }
