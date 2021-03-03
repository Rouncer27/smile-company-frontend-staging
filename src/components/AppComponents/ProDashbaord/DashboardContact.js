import React from "react"
import styled from "styled-components"

import MainContact from "./MainContact"
import SideBar from "./SideBar"

const DashboardContact = () => {
  return (
    <DashboardContactStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainContact />
      </div>
    </DashboardContactStyled>
  )
}

const DashboardContactStyled = styled.div`
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardContact
