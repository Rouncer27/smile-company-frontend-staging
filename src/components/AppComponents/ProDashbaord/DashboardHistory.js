import React from "react"
import styled from "styled-components"

import MainHistory from "./MainHistory"
import SideBar from "./SideBar"
import { mainDahsboard } from "./style/mainDashboard"

const DashboardHistory = () => {
  return (
    <DashboardHistoryStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainHistory />
      </div>
    </DashboardHistoryStyled>
  )
}

const DashboardHistoryStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardHistory
