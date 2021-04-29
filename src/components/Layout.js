import React, { useContext, useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { UserContext } from "../context/UserContext"
import { Magic } from "magic-sdk"
import axios from "axios"

import theme from "../styles/theme/Theme"
import GlobalStyle from "../styles/global/Golbal"
import Header from "./Header"
import Footer from "./Footer"
import ModalLoading from "./UiElements/ModalLoading"
import ModalAlert from "./UiElements/ModalAlert"
import ModalError from "./UiElements/ModalError"
import ModalAddToHome from "./UiElements/ModalAddToHome"

let magic

const Layout = props => {
  const children = props.children
  const [state, dispatch] = useContext(UserContext)

  const getUserDataFromServer = async token => {
    try {
      const response = await axios.get(
        `${process.env.GATSBY_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({ type: "USER_LOGIN", payload: { token, user: response.data } })
      // return response.data
    } catch (err) {
      console.log(err)
    }
  }

  const getTokenFromMagic = async () => {
    try {
      const token = await magic.user.getIdToken()
      return token
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * If user is logged in, get data and display it
   */
  const checkUserLoggedIn = async () => {
    dispatch({ type: "USER_LOADING" })
    try {
      const isLoggedIn = await magic.user.isLoggedIn()
      if (isLoggedIn) {
        const token = await getTokenFromMagic()
        await getUserDataFromServer(token)
        // const user = await getUserDataFromServer(token)
        // dispatch({ type: "USER_LOGIN", payload: { token, user } })
      } else {
        dispatch({ type: "USER_LOGOUT" })
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: "USER_LOGOUT" })
    }
  }

  useEffect(() => {
    if (state.user && state.token) return
    if (state.notUser) return
    magic = new Magic(process.env.GATSBY_MAGIC_PK)
    checkUserLoggedIn()
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
