import React from "react"
import styled from "styled-components"

import MainContact from "./MainContact"
import SideBar from "./SideBar"
import { mainDahsboard } from "./style/mainDashboard"

const DashboardContact = () => {
  return (
    <DashboardContactStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainContact />
      </div>
    </DashboardContactStyled>
  )
}

const DashboardContactStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardContact
