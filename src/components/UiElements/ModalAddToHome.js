import React from "react"
import styled from "styled-components"
import { B1CharcoalGrey, B1White, Btn1DarkPurple } from "../../styles/helpers"

const ModalAddToHome = () => {
  const handleDismiss = () => {
    console.log("remove install warning")
  }

  return (
    <ModalAddToHomeStyled>
      <div className="innerWrap">
        <p>Install Smile and Company</p>
        <p>
          Install this application on your home screen for quick and easy access
          when you're on the go.
        </p>
        <p>
          Just tap <span>ICON</span> then 'Add to home Screen'
        </p>
        <button onClick={handleDismiss}>Dismiss</button>
      </div>
    </ModalAddToHomeStyled>
  )
}

const ModalAddToHomeStyled = styled.div`
  display: block;
  position: fixed;
  bottom: 0%;
  left: 0%;
  width: 100%;
  z-index: 100;

  .innerWrap {
    width: 100%;
    max-width: 45rem;
    margin: 4rem auto;
    padding: 2.5rem;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 0.5rem;
    border: solid 0.1rem #000;
    box-shadow: 0.25rem 0.25rem 0.5rem 0 #000;
    text-align: center;
  }

  p {
    ${B1CharcoalGrey};
  }

  button {
    ${Btn1DarkPurple};
  }
`

export default ModalAddToHome
