import React from "react"
import styled from "styled-components"
import MainCreateBooking from "./MainCreateBooking"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

const DashboardCreateBooking = () => {
  return (
    <DashboardCreateStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainCreateBooking />
      </div>
    </DashboardCreateStyled>
  )
}

const DashboardCreateStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardCreateBooking
