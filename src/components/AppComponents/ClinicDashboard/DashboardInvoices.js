import React from "react"
import styled from "styled-components"
import MainInvoices from "./MainInvoices"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

const DashboardInvoices = () => {
  return (
    <DashboardInvoicesStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainInvoices />
      </div>
    </DashboardInvoicesStyled>
  )
}

const DashboardInvoicesStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardInvoices
