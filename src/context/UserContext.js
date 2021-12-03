import React, { createContext, useReducer } from "react"

export const UserContext = createContext()

const initialState = {
  token: null,
  user: {},
  profile: {},
  bookings: [],
  cart: {
    name: "",
    price: "",
    description: "",
    details: "",
    terms: "",
    active: false,
    qty: 0,
    itemPrice: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
  },
  loading: false,
  error: false,
  errMessage: "",
  alert: false,
  alertMessage: "",
  mountCheck: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
      }

    case "CHANGE_QTY_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          qty: action.payload.qty,
          subTotal: action.payload.subTotal,
          tax: action.payload.tax,
          total: action.payload.total,
        },
      }

    case "CLEAR_CART":
      return {
        ...state,
        loading: false,
        cart: {
          name: "",
          price: "",
          description: "",
          details: "",
          terms: "",
          active: false,
          qty: 0,
          itemPrice: 0,
          subTotal: 0,
          tax: 0,
          total: 0,
        },
      }

    case "MOUNTED_USER_CHECKED":
      return {
        ...state,
        mountCheck: true,
      }

    case "USER_LOGOUT":
      return {
        token: null,
        user: {},
        profile: {},
        bookings: [],
        cart: {
          name: "",
          price: "",
          description: "",
          details: "",
          terms: "",
          active: false,
          qty: 0,
          subTotal: 0,
          tax: 0,
          total: 0,
        },
        loading: false,
        error: false,
        errMessage: "",
        alert: false,
        alertMessage: "",
        mountCheck: false,
      }
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
        profile: action.payload.profile ? action.payload.profile : {},
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
        user: action.payload.user,
        loading: false,
      }
    case "USER_GET_PROFILE":
      return {
        ...state,
        profile: action.payload.profile ? action.payload.profile : {},
        loading: false,
      }
    case "USER_UPDATE_PROFILE":
      return {
        ...state,
        profile: action.payload.profile ? action.payload.profile : {},
        loading: false,
        alert: true,
        alertMessage: action.payload.message,
      }
    case "USER_GET_BOOKINGS":
      return {
        ...state,
        loading: false,
        bookings: action.payload.bookings ? action.payload.bookings : [],
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
