import React from "react"
import styled from "styled-components"
import MainContent from "./MainContent"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default Dashboard
