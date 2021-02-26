import React from "react"
import styled from "styled-components"
import MainInvoiceSingle from "./MainInvoiceSingle"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardInvoiceSingle
