import React from "react"
import styled from "styled-components"
import { B1CharcoalGrey, B1White, colors } from "../../styles/helpers"

import Stripe from "./stripeGateway/Stripe"

const ModalPermanentHiring = ({
  formData,
  setPaymentActive,
  sendEmailToServer,
}) => {
  return (
    <ModalPermanentHiringStyled>
      <div className="alertInner">
        <div className="alertInner__wrapper">
          <div className="message">
            <p className="text">Stripe Payment Here</p>
            <Stripe
              formData={formData}
              setPaymentActive={setPaymentActive}
              sendEmailToServer={sendEmailToServer}
            />
          </div>
          <div className="alertBtn">
            <button type="button" onClick={() => setPaymentActive(false)}>
              &#215;
            </button>
          </div>
        </div>
      </div>
    </ModalPermanentHiringStyled>
  )
}

const ModalPermanentHiringStyled = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(107, 81, 109, 0.4);
  z-index: 99999999999;
  opacity: 1;
  visibility: "visible";

  .alertInner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: ${colors.white};
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
      width: 100%;
      .text {
        ${B1CharcoalGrey};
        width: calc(100%);
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

export default ModalPermanentHiring
