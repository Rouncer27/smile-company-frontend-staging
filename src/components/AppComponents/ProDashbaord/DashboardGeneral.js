import React from "react"
import styled from "styled-components"

import MainGeneral from "./MainGeneral"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardGeneral
