import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import styled from "styled-components"
import { colors, Nav1CharcoalGrey } from "../../styles/helpers"

import Stripe from "./stripeGateway/Stripe"
// Context
import { UserContext } from "../../context/UserContext"

const ModalPermanentHiring = ({
  formData,
  setPaymentActive,
  sendEmailToServer,
}) => {
  const [, dispatch] = useContext(UserContext)
  const [product, setProduct] = useState(null)

  const getProductDataFromServer = async () => {
    dispatch({ type: "USER_LOADING" })
    try {
      const response = await axios.get(
        `${process.env.GATSBY_API_URL}/permanent-hiring`
      )
      setProduct({
        label: response.data.Label,
        description: response.data.description,
        id: response.data.id,
        price: response.data.price,
        tax_percent: response.data.tax_percent,
      })
      dispatch({ type: "USER_LOADING_COMPLETE" })
    } catch (err) {
      console.dir(err)
      const message =
        err.response.data &&
        err.response.data.message &&
        typeof err.response.data.message === "object"
          ? err.response.data.message[0] &&
            err.response.data.message[0].messages[0] &&
            err.response.data.message[0].messages[0].message
          : typeof err.response.data.message === "string"
          ? err.response.data.message
          : "Something went wrong. Please try again later"
      dispatch({ type: "USER_ERROR", payload: { message } })
    }
  }

  useEffect(() => {
    getProductDataFromServer()
  }, [])

  return (
    <ModalPermanentHiringStyled>
      <div className="alertInner">
        <div className="alertInner__wrapper">
          <div className="message">
            <div className="message__totals">
              <p>{product && product.label}</p>
              <p>Price: &#36;{product && product.price.toFixed(2)}</p>
              <p>
                Tax (5% GST): &#36;
                {product && (product.price * product.tax_percent).toFixed(2)}
              </p>
              <p>
                Total: &#36;
                {product &&
                  (product.price + product.price * product.tax_percent).toFixed(
                    2
                  )}
              </p>
            </div>
            {product && (
              <div className="message__stripe">
                <Stripe
                  product={product}
                  formData={formData}
                  setPaymentActive={setPaymentActive}
                  sendEmailToServer={sendEmailToServer}
                />
              </div>
            )}
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
  z-index: 9999999;
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
      text-align: center;

      &__totals {
        p {
          ${Nav1CharcoalGrey};
          margin-bottom: 0.5rem;

          &:hover {
            color: ${colors.colorAlt};
            cursor: inherit;
          }
        }
      }

      &__stripe {
        width: 100%;
        margin-top: 2.5rem;
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
