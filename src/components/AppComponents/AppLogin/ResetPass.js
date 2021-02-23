import React from "react"
import styled from "styled-components"

import ResetFields from "./ResetFields"
import AppSidebar from "../AppSidebar"

const ResetPass = ({ location }) => {
  return (
    <MainLoginStyled>
      <div className="wrapper">
        <div className="mainAppArea">
          <ResetFields location={location} />
        </div>
        <div className="mainAppSidebar">
          <AppSidebar location="login" />
        </div>
      </div>
    </MainLoginStyled>
  )
}

const MainLoginStyled = styled.div`
  .wrapper {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    width: 100%;
    margin: auto;
  }

  .mainAppArea {
    width: 100vw;

    @media (min-width: 768px) {
      width: 70vw;
    }

    @media (min-width: 1025px) {
      width: 70vw;
      padding: 10rem 2.5vw;
    }
  }

  .mainAppSidebar {
    display: flex;
    justify-content: center;
    width: 100vw;

    @media (min-width: 768px) {
      width: 30vw;
    }
  }
`

export default ResetPass
