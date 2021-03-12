import React from "react"
import styled from "styled-components"
import { colors, H4DarkGrey } from "../../../styles/helpers"
// import Lottie from "react-lottie"
// import * as formError from "../../styles/elements/lottieAnimations/formError.json"

// const defaultOptions = {
//   loop: false,
//   autoplay: false,
//   animationData: formError.default,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// }

const ErrorModal = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  visibility: ${props => (props.isActive ? "visible" : "hidden")};
  opacity: ${props => (props.isActive ? 1 : 0)};
  z-index: 99999999;

  .modalBackground {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 1;
  }

  .modalInner {
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 4rem;
    background-color: ${colors.colorSecondary};
    opacity: 0.95;
    border-radius: 0.75rem;
    box-shadow: 8px 9px 19px 0 rgba(0, 0, 0, 0.49);
    transition: all 0.2s ease-in;
    z-index: 999999999;

    @media (min-width: 768px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @media (min-width: 1025px) {
      max-width: 70rem;
      height: auto;
      padding: 8rem;
    }

    .closeButton {
      position: absolute;
      top: 1rem;
      right: 1rem;

      button {
        width: 3.5rem;
        height: 3.5rem;
        transition: all 0.3s ease;
        border-radius: 50%;
        border: 0.25rem solid ${colors.colorPrimary};
        background-color: ${colors.colorPrimary};
        color: ${colors.colorSecondary};
        font-weight: 700;
        cursor: pointer;

        &:hover {
          background-color: ${colors.white};
          color: ${colors.colorPrimary};
        }
      }
    }

    &__content {
      @media (min-width: 768px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
      }
      h2 {
        ${H4DarkGrey};
        width: 100%;
        text-align: center;
      }
    }
  }
`

const FormErrors = ({ isActive, handleClose }) => {
  return (
    <ErrorModal isActive={isActive}>
      <div className="modalInner">
        <div className="modalInner__content">
          <div>
            {/* <Lottie
              options={defaultOptions}
              isPaused={!isActive}
              height={150}
              width={150}
            /> */}
          </div>
          <h2>
            There were a few errors in your form. <br />
            Please follow the instructions on how to fix them and try again.
          </h2>
        </div>
        <div className="closeButton">
          <button type="button" onClick={handleClose}>
            &#88;
          </button>
        </div>
      </div>
      <div className="modalBackground" />
    </ErrorModal>
  )
}

export default FormErrors
