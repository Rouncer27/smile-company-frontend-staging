import React from "react"
import styled from "styled-components"

import MainAvailable from "./MainAvailable"
import SideBar from "./SideBar"

const DashboardAvailable = () => {
  return (
    <DashboardAvailableStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainAvailable />
      </div>
    </DashboardAvailableStyled>
  )
}

const DashboardAvailableStyled = styled.div`
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardAvailable
