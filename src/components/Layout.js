import React, { useContext, useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { UserContext } from "../context/UserContext"
import axios from "axios"

import theme from "../styles/theme/Theme"
import GlobalStyle from "../styles/global/Golbal"
import Header from "./Header"
import Footer from "./Footer"
import ModalLoading from "./UiElements/ModalLoading"
import ModalAlert from "./UiElements/ModalAlert"
import ModalError from "./UiElements/ModalError"
import ModalAddToHome from "./UiElements/ModalAddToHome"

const Layout = props => {
  const children = props.children
  const [state, dispatch] = useContext(UserContext)

  const getUserDataFromServer = async () => {
    try {
      const response = await axios.get(
        `${process.env.GATSBY_API_URL}/users/me`,
        {
          withCredentials: true,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      dispatch({ type: "USER_LOGIN", payload: { user: response.data } })
      dispatch({
        type: "USER_GET_PROFILE",
        payload: { profile: response.data.mountedProfile },
      })
    } catch (err) {
      console.dir(err)
      dispatch({ type: "USER_LOGOUT" })
      dispatch({ type: "MOUNTED_USER_CHECKED" })
    }
  }

  const checkUserLoggedIn = async () => {
    dispatch({ type: "USER_LOADING" })
    try {
      await getUserDataFromServer()
    } catch (err) {
      console.log(err)
      dispatch({ type: "USER_LOGOUT" })
    }
  }

  useEffect(() => {
    console.log("state.mountCheck", state.mountCheck)
    //* Only check once for user account. Then user needs to login to check again */
    if (state.mountCheck) return
    checkUserLoggedIn()
    dispatch({ type: "MOUNTED_USER_CHECKED" })
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ModalAddToHome />
        <ModalLoading />
        <ModalAlert />
        <ModalError />
        <Header isapp={props.isapp} />
        <main>{children}</main>
        <Footer location={props.location} />
      </ThemeProvider>
    </>
  )
}

export default Layout
