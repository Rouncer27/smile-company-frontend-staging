import React from "react"
import styled from "styled-components"

import MainGeneral from "./MainGeneral"
import SideBar from "./SideBar"
import { mainDahsboard } from "./style/mainDashboard"

const DashboardGeneral = () => {
  return (
    <DashboardGeneralStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainGeneral />
      </div>
    </DashboardGeneralStyled>
  )
}

const DashboardGeneralStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardGeneral
