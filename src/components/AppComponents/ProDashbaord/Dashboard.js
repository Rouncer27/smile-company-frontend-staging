import React from "react"
import styled from "styled-components"
import MainHome from "./MainHome"
import SideBar from "./SideBar"

import { mainDahsboard } from "./style/mainDashboard"

const Dashboard = () => {
  return (
    <DashboardStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainHome />
      </div>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  ${mainDahsboard};
`

export default Dashboard
