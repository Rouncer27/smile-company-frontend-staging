import React from "react"
import styled from "styled-components"
import MainBookingSingle from "./MainBookingSingle"
import SideBar from "./SideBar"

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
  .dashWrapper {
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }
`

export default DashboardBookingSingle
