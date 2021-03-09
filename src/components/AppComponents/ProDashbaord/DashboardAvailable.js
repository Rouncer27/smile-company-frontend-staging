import React from "react"
import styled from "styled-components"

import MainAvailable from "./MainAvailable"
import SideBar from "./SideBar"
import { mainDahsboard } from "./style/mainDashboard"

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
  ${mainDahsboard};
`

export default DashboardAvailable
