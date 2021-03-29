import React from "react"
import styled from "styled-components"

import MainRequests from "./MainRequests"
import SideBar from "./SideBar"
import { mainDahsboard } from "./style/mainDashboard"

const DashboardAvailable = () => {
  return (
    <DashboardAvailableStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainRequests />
      </div>
    </DashboardAvailableStyled>
  )
}

const DashboardAvailableStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardAvailable
