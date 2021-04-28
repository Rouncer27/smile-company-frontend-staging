import React from "react"
import styled from "styled-components"
import { B1White, Btn1LightSage, colors } from "../../styles/helpers"

const ModalAlert = ({
  active,
  setFeeModalActive,
  handleShortCancelBooking,
}) => {
  const handleYes = () => {
    setFeeModalActive(false)
    handleShortCancelBooking()
  }

  const handleNo = () => {
    setFeeModalActive(false)
  }

  return (
    <ModalAlertStyled alertactive={active}>
      <div className="alertInner">
        <div className="alertInner__wrapper">
          <div className="message">
            <p className="checkmark">
              <span>&#9888;</span>
            </p>
            <p className="text">
              This is a short notice cancellation. There will be a $50 fee
              applied to your account. You will not be able to create a new
              booking request until the cancellation fee is paid.
            </p>
            <p className="text">Are you sure you want to cancel?</p>
            <div className="alertBtn">
              <button type="button" onClick={handleYes}>
                YES
              </button>
              <button type="button" onClick={handleNo}>
                NO
              </button>
            </div>
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
      flex-wrap: wrap;
      position: relative;

      .checkmark {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 7rem;
        height: 7rem;
        margin-bottom: 2rem;
        background-color: #ed4f32;
        border-radius: 50%;

        span {
          color: ${colors.colorPrimary};
          font-size: 5rem;
          line-height: 5rem;
        }
      }

      .text {
        ${B1White};
        width: calc(100%);
        color: ${colors.white};
        margin: 0;
        text-align: center;
      }
    }

    .alertBtn {
      width: 100%;
      margin-top: 2.5rem;
      text-align: center;

      button {
        ${Btn1LightSage};
        margin: 0 1rem;
      }
    }
  }
`

export default ModalAlert
