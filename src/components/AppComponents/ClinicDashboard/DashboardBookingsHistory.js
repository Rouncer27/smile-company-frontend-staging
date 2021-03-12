import React from "react"
import styled from "styled-components"
import MainBookingsHistory from "./MainBookingsHistory"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

const DashboardBookings = () => {
  return (
    <DashboardBookingsStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainBookingsHistory />
      </div>
    </DashboardBookingsStyled>
  )
}

const DashboardBookingsStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardBookings
