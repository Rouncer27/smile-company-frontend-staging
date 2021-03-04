import React from "react"
import styled from "styled-components"

import MainApproved from "./MainApproved"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardApproved
