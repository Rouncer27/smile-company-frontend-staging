import React from "react"
import styled from "styled-components"

import AppSidebar from "../AppSidebar"
import ClinicSignUpIntro from "./ClinicSignUpIntro"
import SignupFields from "./SignupFields"

const MainClinic = () => {
  return (
    <SignUpFieldsStyled>
      <div className="wrapper">
        <div className="mainAppArea">
          <ClinicSignUpIntro />
          <SignupFields />
        </div>
        <div className="mainAppSidebar">
          <AppSidebar location="clinicSignup" />
        </div>
      </div>
    </SignUpFieldsStyled>
  )
}

const SignUpFieldsStyled = styled.div`
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

export default MainClinic
