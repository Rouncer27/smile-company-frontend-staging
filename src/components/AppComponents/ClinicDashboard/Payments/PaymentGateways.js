import React, { useState } from "react"
import styled from "styled-components"

import { colors, Nav1CharcoalGrey } from "../../../../styles/helpers"

import PayPal from "./PayPal"
import Stripe from "./Stripe"

const PaymentGateways = ({ productType }) => {
  const [gateway, setGateway] = useState("")
  return (
    <PaymentGatewaysStyled>
      <div className="gatewayTitle">
        <p>Please Select a Payment Option</p>
      </div>
      <div className="paymentOptions">
        <div className="checkbox-wrapper">
          <div className="checkbox-wrapper__paypal">
            <input
              type="radio"
              id="paypalGateway"
              name="gateway"
              value="paypalGateway"
              checked={gateway === "paypalGateway"}
              onClick={() => setGateway("paypalGateway")}
            />
            <label
              onClick={() => setGateway("paypalGateway")}
              htmlFor="paypalGateway"
            >
              PayPal
            </label>
          </div>
          <div className="checkbox-wrapper__stripe">
            <input
              type="radio"
              id="stripeGateway"
              name="gateway"
              value="stripeGateway"
              checked={gateway === "stripeGateway"}
              onClick={() => setGateway("stripeGateway")}
            />
            <label
              onClick={() => setGateway("stripeGateway")}
              htmlFor="stripeGateway"
            >
              Stripe
            </label>
          </div>
        </div>
      </div>
      {gateway !== "" && (
        <div className="paymentGateway">
          <p>you have selected {gateway}</p>
          {gateway === "paypalGateway" && <PayPal productType={productType} />}
          {gateway === "stripeGateway" && <Stripe productType={productType} />}
        </div>
      )}
    </PaymentGatewaysStyled>
  )
}

const PaymentGatewaysStyled = styled.div`
  margin: 0 auto 5rem;
  .gatewayTitle {
    width: 100%;
    margin-bottom: 2.5rem;

    p {
      ${Nav1CharcoalGrey};
      margin: 0;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
    }
  }

  .paymentOptions {
    width: 100%;

    .checkbox-wrapper {
      position: relative;

      &__paypal {
        position: relative;
        margin-bottom: 1rem;
      }

      &__stripe {
        position: relative;
        margin-top: 1rem;
      }

      label {
        ${Nav1CharcoalGrey};
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        padding-right: 5rem;
        cursor: pointer;

        &::before,
        &::after {
          pointer-events: none;
          content: " ";
        }

        &::before {
          display: flex;
          width: 2rem;
          height: 2rem;
          border: solid 0.1rem ${colors.colorAlt};
          background: ${colors.white};
          margin-right: 1rem;
        }

        &::after {
          display: flex;
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          width: 1.2rem;
          height: 0.75rem;
          border-bottom: solid 0.4rem ${colors.colorAlt};
          border-left: solid 0.4rem ${colors.colorAlt};
          background: none;
          transform: rotate(-45deg) scale(0);
          transition: transform 0.3s ease;
        }

        &:hover {
          color: ${colors.colorAlt};
        }
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 2rem;
        height: 2rem;
        -webkit-appearance: none;
        cursor: pointer;

        &:checked + label:after {
          opacity: 1;
          transform: rotate(-45deg) scale(1);
        }
      }
    }
  }

  .paymentGateway {
    width: 100%;
    margin-top: 3rem;

    p {
      ${Nav1CharcoalGrey};
      margin: 0;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
    }
  }
`

export default PaymentGateways
