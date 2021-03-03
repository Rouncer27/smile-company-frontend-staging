import React from "react"
import styled from "styled-components"

import MainExperience from "./MainExperience"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardExperience
