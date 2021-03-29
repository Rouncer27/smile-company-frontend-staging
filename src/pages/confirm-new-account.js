import React from "react"
import styled from "styled-components"
import { H4Lavender, colors } from "../styles/helpers"

const ConfirmNewAccount = () => {
  return (
    <ConfirmNewAccountStyled>
      <div className="contentWrapper">
        <p className="checkmark">
          <span>&#10003;</span>
        </p>
        <h2>
          <span>Success!</span>{" "}
          <span>Your account email has been confirmed.</span>{" "}
          <span>
            Close this window and go back to your original dashboard screen.
          </span>
        </h2>
      </div>
    </ConfirmNewAccountStyled>
  )
}

const ConfirmNewAccountStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  .contentWrapper {
    width: 100%;
    max-width: 60rem;
    margin: 2rem auto;
    padding: 2rem;
  }

  .checkmark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8.5rem;
    height: 8.5rem;
    background-color: ${colors.colorTertiary};
    border-radius: 50%;

    span {
      color: ${colors.white};
      font-size: 5rem;
    }
  }

  h2 {
    ${H4Lavender};

    span {
      display: block;
    }
  }
`

export default ConfirmNewAccount
