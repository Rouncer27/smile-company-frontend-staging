import React from "react"
import styled from "styled-components"

import MainPurchase from "./MainPurchase"
import SideBar from "./SideBar"

const DashboardPurchaseBookings = () => {
  return (
    <DashboardPurchaseBookingsStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainPurchase />
      </div>
    </DashboardPurchaseBookingsStyled>
  )
}

const DashboardPurchaseBookingsStyled = styled.div`
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardPurchaseBookings
