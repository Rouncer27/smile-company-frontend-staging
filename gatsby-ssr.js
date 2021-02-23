import React from "react"
import { UserContextProvider } from "./src/context/UserContext"

export const wrapRootElement = ({ element }) => {
  return <UserContextProvider>{element}</UserContextProvider>
}
