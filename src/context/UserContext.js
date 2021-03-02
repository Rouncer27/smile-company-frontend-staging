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
    case "USER_LOADING_COMPLETE":
      return {
        ...state,
        loading: false,
      }
    case "USER_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
        errMessage:
          action.payload && action.payload.message
            ? action.payload.message
            : "Something went wrong. Please try again later",
      }
    case "USER_CLEAR_ERROR":
      return {
        ...state,
        error: false,
        errMessage: "",
      }
    case "USER_LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        profile: action.payload.profile,
        loading: false,
      }
    case "USER_RESET":
      return {
        ...state,
        alert: true,
        alertMessage: "A reset link has been sent to your email account.",
        loading: false,
      }
    case "USER_ALERT":
      return {
        ...state,
        alert: true,
        alertMessage: action.payload.message,
        loading: false,
      }
    case "USER_CLEAR_ALERT":
      return {
        ...state,
        alert: false,
        alertMessage: "",
      }
    case "USER_UPDATE":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      }
    case "USER_GET_PROFILE":
      return {
        ...state,
        profile: action.payload.profile,
        loading: false,
      }
    case "USER_UPDATE_PROFILE":
      return {
        ...state,
        profile: action.payload.profile,
        loading: false,
        alert: true,
        alertMessage: action.payload.message,
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
