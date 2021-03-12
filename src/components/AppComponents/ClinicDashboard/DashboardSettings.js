import React from "react"
import styled from "styled-components"

import MainSettings from "./MainSettings"
import SideBar from "./SideBar"

const DashboardSettings = () => {
  return (
    <DashboardSettingsStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainSettings />
      </div>
    </DashboardSettingsStyled>
  )
}

const DashboardSettingsStyled = styled.div`
  .dashWrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardSettings
