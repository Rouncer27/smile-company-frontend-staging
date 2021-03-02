import React from "react"
import styled from "styled-components"
import MainBookings from "./MainBookings"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardBookings
