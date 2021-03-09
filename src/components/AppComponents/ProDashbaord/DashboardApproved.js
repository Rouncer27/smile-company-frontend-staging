import React from "react"
import styled from "styled-components"

import MainApproved from "./MainApproved"
import SideBar from "./SideBar"
import { mainDahsboard } from "./style/mainDashboard"

const DashboardApproved = () => {
  return (
    <DashboardApprovedStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainApproved />
      </div>
    </DashboardApprovedStyled>
  )
}

const DashboardApprovedStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardApproved
