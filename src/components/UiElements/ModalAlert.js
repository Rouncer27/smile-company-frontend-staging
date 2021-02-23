import React, { useContext } from "react"
import styled from "styled-components"
import { UserContext } from "../../context/UserContext"
import { B1White, colors } from "../../styles/helpers"

const ModalAlert = () => {
  const [state, dispatch] = useContext(UserContext)
  console.log("state", state)

  const handleDismiss = () => {
    console.log("CLEARR!!!!")
    dispatch({ type: "USER_CLEAR_ALERT" })
  }

  return (
    <ModalAlertStyled alertactive={state.alert}>
      <div className="alertInner">
        <div className="alertInner__wrapper">
          <div className="message">
            <p className="checkmark">
              <span>&#10003;</span>
            </p>
            <p className="text">{state.alertMessage}</p>
          </div>
          <div className="alertBtn">
            <button type="button" onClick={handleDismiss}>
              &#215;
            </button>
          </div>
        </div>
      </div>
    </ModalAlertStyled>
  )
}

const ModalAlertStyled = styled.div`
  display: ${props => (props.alertactive ? "block" : "none")};
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(107, 81, 109, 0.4);
  z-index: ${props => (props.alertactive ? 99999999999 : -1)};
  opacity: ${props => (props.alertactive ? 1 : 0)};
  visibility: ${props => (props.alertactive ? "visible" : "hidden")};

  .alertInner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: ${colors.colorPrimary};
    box-shadow: 1.2rem 1.2rem 0.3rem 0 rgba(0, 0, 0, 0.44);
    opacity: 1;

    @media (min-width: 768px) {
      width: 100%;
      max-width: 55rem;
    }

    @media (min-width: 1025px) {
      width: 100%;
      max-width: 65rem;
    }

    &__wrapper {
      margin: 1.5rem;
      padding: 6rem 4rem;
      border: 0.1rem solid ${colors.white};
    }

    .message {
      display: flex;
      position: relative;

      .checkmark {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 7rem;
        height: 7rem;
        margin: 0;
        background-color: ${colors.colorTertiary};
        border-radius: 50%;

        span {
          color: ${colors.colorPrimary};
          font-size: 5rem;
          line-height: 5rem;
        }
      }

      .text {
        ${B1White};
        width: calc(100% - 7rem);
        color: ${colors.white};
        margin: 0;
        text-align: center;
      }
    }

    .alertBtn {
      display: block;
      position: absolute;
      top: 2.5rem;
      right: 2.5rem;

      button {
        transition: all 0.3s ease;
        background-color: ${colors.colorTertiary};
        border: none;
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        color: ${colors.colorPrimary};
        font-size: 3.5rem;
        line-height: 3.5rem;
        font-weight: bold;
        cursor: pointer;

        &:hover {
          background-color: ${colors.white};
        }
      }
    }
  }
`

export default ModalAlert
