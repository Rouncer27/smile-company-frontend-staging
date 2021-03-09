import React from "react"
import styled from "styled-components"
import MainBookingSingle from "./MainBookingSingle"
import SideBar from "./SideBar"
import { mainDahsboard } from "./styles/mainDashboard"

const DashboardBookingSingle = () => {
  return (
    <DashboardBookingSingleStyled>
      <div className="dashWrapper">
        <SideBar />
        <MainBookingSingle />
      </div>
    </DashboardBookingSingleStyled>
  )
}

const DashboardBookingSingleStyled = styled.div`
  ${mainDahsboard};
`

export default DashboardBookingSingle
