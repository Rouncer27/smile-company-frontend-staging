import React from "react"
import styled from "styled-components"
import MainPayment from "./MainPayment"
import SideBar from "./SideBar"

const DashbaordPayment = () => {
  return (
    <DashbaordPaymentStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainPayment />
      </div>
    </DashbaordPaymentStyled>
  )
}

const DashbaordPaymentStyled = styled.div`
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashbaordPayment
