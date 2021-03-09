import React from "react"
import styled from "styled-components"
import MainBookings from "./MainBookings"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

const DashboardBookings = () => {
  return (
    <DashboardBookingsStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainBookings />
      </div>
    </DashboardBookingsStyled>
  )
}

const DashboardBookingsStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardBookings
