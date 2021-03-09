import React from "react"
import styled from "styled-components"

import AppSidebar from "../AppSidebar"
import AppSignUpIntro from "../AppSignUpIntro"
import SignupFields from "./SignupFields"

const MainDental = () => {
  return (
    <SignUpFieldsStyled>
      <div className="wrapper">
        <div className="mainAppArea">
          <AppSignUpIntro location="dental" />
          <SignupFields />
        </div>
        <div className="mainAppSidebar">
          <AppSidebar location="dentalSignup" />
        </div>
      </div>
    </SignUpFieldsStyled>
  )
}

const SignUpFieldsStyled = styled.div`
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: center;
    width: 100%;
    margin: auto;
  }

  .mainAppArea {
    width: 100vw;
    padding: 2rem;

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

export default MainDental
