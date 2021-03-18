import React from "react"
import styled from "styled-components"
import {
  Nav1CharcoalGrey,
  colors,
  H1CharcoalGrey,
  H4DarkPurple,
  Btn1DarkPurple,
  B1CharcoalGrey,
} from "../../styles/helpers"

const TermsModal = ({
  terms,
  activemodal,
  setTermsModalActive,
  setTermsRead,
}) => {
  return (
    <ModalAlertStyled alertactive={activemodal}>
      <div className="alertInner">
        <div className="alertInner__wrapper">
          <div className="termsTitle">
            <h2>Terms and Conditions</h2>
          </div>

          <div
            className="termsContent"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
          <div className="termsAgree">
            <p>
              I have fully Read and understand the Terms and Conditions of Smile
              and Company
            </p>
            <button
              onClick={() => {
                setTermsRead(true)
                setTermsModalActive(false)
              }}
            >
              Yes I agree
            </button>
            <button
              onClick={() => {
                setTermsRead(false)
                setTermsModalActive(false)
              }}
            >
              No I do not agree
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
  overflow: scroll;

  .alertInner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 90vh;
    transform: translate(-50%, -50%);
    background-color: ${colors.white};
    box-shadow: 1.2rem 1.2rem 0.3rem 0 rgba(0, 0, 0, 0.44);
    opacity: 1;
    overflow: scroll;

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
      overflow: scroll;
    }

    .termsTitle {
      h2 {
        ${H1CharcoalGrey};
      }
    }

    .termsContent {
      h4 {
        ${H4DarkPurple};
      }

      p {
        ${Nav1CharcoalGrey};
        margin-bottom: 1.5rem;

        &:hover {
          color: ${colors.colorAlt};
          cursor: inherit;
        }
      }
    }

    .termsAgree {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      margin: 3rem auto;

      p {
        ${B1CharcoalGrey};
        width: 100%;
      }

      button:first-of-type {
        ${Btn1DarkPurple};
      }
      button:last-of-type {
        ${Btn1DarkPurple};
      }
    }
  }
`

export default TermsModal
