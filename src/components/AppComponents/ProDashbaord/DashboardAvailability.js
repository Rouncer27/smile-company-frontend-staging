import React from "react"
import styled from "styled-components"

import MainAvailability from "./MainAvailability"
import SideBar from "./SideBar"
import { mainDahsboard } from "./style/mainDashboard"

const DashboardAvailability = () => {
  return (
    <DashboardAvailabilityStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainAvailability />
      </div>
    </DashboardAvailabilityStyled>
  )
}

const DashboardAvailabilityStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardAvailability
