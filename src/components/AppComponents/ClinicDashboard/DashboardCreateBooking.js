import React from "react"
import styled from "styled-components"
import MainCreateBooking from "./MainCreateBooking"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardCreateBooking
