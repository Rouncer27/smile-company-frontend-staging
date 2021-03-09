import React from "react"
import styled from "styled-components"
import MainPurchase from "./MainPurchase"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

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
  ${mainDahsboard};
`

export default DashboardPurchaseBookings
