import React from "react"
import styled from "styled-components"
import { HashLoader } from "react-spinners"
import { colors, H1White } from "../../../styles/helpers"

const FormSubmitModal = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  transition: all 0.4s ease-in;
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
    background-color: ${colors.colorPrimary};
    opacity: 0.95;
    border-radius: 0.75rem;
    box-shadow: 8px 9px 19px 0 rgba(0, 0, 0, 0.49);
    transition: all 0.2s ease-in;
    z-index: 999999999;

    @media (min-width: 768px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(
        ${props => (props.isActive ? "-50%, -50%" : "-50%, 0%")}
      );
    }

    @media (min-width: 1025px) {
      max-width: 70rem;
      height: auto;
      padding: 8rem;
    }

    &__content {
      @media (min-width: 768px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
      }

      &--loader {
        width: 100%;
        margin: 2rem auto 4rem;
        text-align: center;
      }

      h2 {
        ${H1White};
        width: 100%;
        color: ${colors.white};
        text-align: center;
      }
    }
  }
`

const FormSubmit = ({ isActive }) => {
  return (
    <FormSubmitModal isActive={isActive}>
      <div className="modalInner">
        <div className="modalInner__content">
          <div className="modalInner__content--loader">
            <HashLoader size={75} color={"#ad89a6"} />
          </div>
          <h2>
            Thank you, submitting your form. <br />
            Please standby.
          </h2>
        </div>
      </div>
      <div className="modalBackground" />
    </FormSubmitModal>
  )
}

export default FormSubmit
