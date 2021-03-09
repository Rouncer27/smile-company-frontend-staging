import React from "react"
import styled from "styled-components"
import MainPayment from "./MainPayment"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

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
  ${mainDahsboard};
`

export default DashbaordPayment
