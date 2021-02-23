import React, { createContext, useReducer } from "react"

export const UserContext = createContext()

const initialState = {
  token: "",
  user: {},
  profile: {},
  loading: false,
  error: false,
  errMessage: "",
  alert: false,
  alertMessage: "",
}

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        loading: true,
      }
    case "USER_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errMessage: "Something Went Wrong...",
      }
    case "USER_LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      }
    case "USER_RESET":
      return {
        ...state,
        alert: true,
        alertMessage: "A reste link has been sent to your email account.",
        loading: false,
      }
    case "USER_UPDATE":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      }
    default:
      return state
  }
}

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}
