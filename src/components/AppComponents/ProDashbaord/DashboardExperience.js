import React from "react"
import styled from "styled-components"

import MainExperience from "./MainExperience"
import SideBar from "./SideBar"
import { mainDahsboard } from "./style/mainDashboard"

const DashboardExperience = () => {
  return (
    <DashboardExperienceStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainExperience />
      </div>
    </DashboardExperienceStyled>
  )
}

const DashboardExperienceStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardExperience
