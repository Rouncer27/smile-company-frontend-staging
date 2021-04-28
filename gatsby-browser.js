import React from "react"
import { UserContextProvider } from "./src/context/UserContext"

export const wrapRootElement = ({ element }) => {
  return <UserContextProvider>{element}</UserContextProvider>
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
