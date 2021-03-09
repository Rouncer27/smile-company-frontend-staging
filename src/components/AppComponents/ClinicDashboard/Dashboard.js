import React from "react"
import styled from "styled-components"
import MainContent from "./MainContent"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

const Dashboard = () => {
  return (
    <DashboardStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainContent />
      </div>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  ${mainDahsboard};
`

export default Dashboard
