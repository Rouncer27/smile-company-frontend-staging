import React from "react"
import { ThemeProvider } from "styled-components"

import theme from "../styles/theme/Theme"
import GlobalStyle from "../styles/global/Golbal"
import Header from "./Header"
import Footer from "./Footer"
import ModalLoading from "./UiElements/ModalLoading"
import ModalAlert from "./UiElements/ModalAlert"

const Layout = props => {
  const children = props.children

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ModalLoading />
        <ModalAlert />
        <Header />
        <main>{children}</main>
        <Footer location={props.location} />
      </ThemeProvider>
    </>
  )
}

export default Layout
