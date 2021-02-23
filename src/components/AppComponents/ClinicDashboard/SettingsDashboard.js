import React from "react"
import styled from "styled-components"

import MainSettings from "./MainSettings"
import SideBar from "./SideBar"

const SettingsDashboard = () => {
  return (
    <SettingsDashboardStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainSettings />
      </div>
    </SettingsDashboardStyled>
  )
}

const SettingsDashboardStyled = styled.div`
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default SettingsDashboard
