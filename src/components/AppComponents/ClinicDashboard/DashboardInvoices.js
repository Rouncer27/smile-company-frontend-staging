import React from "react"
import styled from "styled-components"
import MainInvoices from "./MainInvoices"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardInvoices
