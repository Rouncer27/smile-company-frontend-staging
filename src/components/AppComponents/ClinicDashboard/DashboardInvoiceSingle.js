import React from "react"
import styled from "styled-components"
import MainInvoiceSingle from "./MainInvoiceSingle"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

const DashboardInvoiceSingle = () => {
  return (
    <DashboardInvoiceSingleStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainInvoiceSingle />
      </div>
    </DashboardInvoiceSingleStyled>
  )
}

const DashboardInvoiceSingleStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardInvoiceSingle
