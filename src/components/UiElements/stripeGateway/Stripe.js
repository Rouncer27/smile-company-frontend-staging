import React, { useContext, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import StripeCheckout from "react-stripe-checkout"
import { colors, Nav1CharcoalGrey } from "../../../styles/helpers"
// Context
import { UserContext } from "../../../context/UserContext"

const Stripe = ({ product, formData, setPaymentActive, sendEmailToServer }) => {
  const [paymentSent, setPaymentSent] = useState(false)
  const [, dispatch] = useContext(UserContext)

  async function handleToken(token, addresses) {
    dispatch({ type: "USER_LOADING" })
    setPaymentSent(true)
    try {
      const response = await axios.post(
        `${process.env.GATSBY_API_URL}/invoice-permanent-hirings`,
        { token, packageId: "permanent-placement", addresses, formData }
      )
      const { status } = response.data
      setPaymentActive(false)
      dispatch({ type: "USER_LOADING_COMPLETE" })
      if (status === "success") {
        sendEmailToServer()
      } else {
        sendEmailToServer()
      }
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

  return (
    <CheckoutStyled>
      {paymentSent ? (
        <div className="paymentProcessed">
          <p>Payment is being processed, thank you.</p>
        </div>
      ) : (
        <StripeCheckout
          stripeKey={process.env.GATSBY_STRIPE_PK}
          token={handleToken}
          currency="CAD"
          amount={(product.price + product.price * product.tax_percent) * 100}
          panelLabel={`Pay`}
          name={product.name}
          billingAddress
          email={formData.email}
          allowRememberMe={false}
        />
      )}
    </CheckoutStyled>
  )
}

const CheckoutStyled = styled.div`
  width: 100%;
  text-align: center;

  .paymentProcessed {
    p {
      ${Nav1CharcoalGrey};

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
    }
  }
`

export default Stripe
