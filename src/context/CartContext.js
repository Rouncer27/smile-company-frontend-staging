import React, { createContext, useReducer } from "react"

export const CartContext = createContext()

const initialState = {
  cart: {},
  loading: false,
  error: false,
  errMessage: "",
  alert: false,
  alertMessage: "",
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_LOADING":
      return {
        ...state,
        loading: true,
      }

    default:
      return state
  }
}

export const CartContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {props.children}
    </CartContext.Provider>
  )
}
