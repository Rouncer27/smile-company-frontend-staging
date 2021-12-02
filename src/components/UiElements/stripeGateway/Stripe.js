import React, { useContext, useState } from "react"
import axios from "axios"
import styled from "styled-components"
// import StripeCheckout from "react-stripe-checkout"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import {
  colors,
  Nav1CharcoalGrey,
  Btn1DarkPurple,
} from "../../../styles/helpers"
// Context
import { UserContext } from "../../../context/UserContext"

const StripeCheckout = ({
  product,
  formData,
  setPaymentActive,
  sendEmailToServer,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [, dispatch] = useContext(UserContext)

  async function handleSubmit(event) {
    event.preventDefault()
    dispatch({ type: "USER_LOADING" })
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: formData.email,
      },
    })

    if (!error) {
      const { id } = paymentMethod
      const packageId = formData.package

      const invoiceUrl =
        packageId === "permanent-placement"
          ? "invoice-permanent-hirings"
          : packageId === "permanent-dentist"
          ? "invoice-permanent-hirings-dentists"
          : ""

      try {
        const response = await axios.post(
          `${process.env.GATSBY_API_URL}/${invoiceUrl}`,
          { id, packageId, formData }
        )
        const { status, err } = response.data
        setPaymentActive(false)
        dispatch({ type: "USER_LOADING_COMPLETE" })
        if (status === "succeeded") {
          sendEmailToServer()
        } else {
          dispatch({
            type: "USER_ERROR",
            payload: {
              message: err && err.raw.message,
            },
          })
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
    } else {
      dispatch({ type: "USER_LOADING_COMPLETE" })
    }
  }

  return (
    <CheckoutStyled onSubmit={handleSubmit}>
      <label>Card</label>
      <div className="card-input" id="card-element">
        <CardElement
          options={{
            iconStyle: "solid",
            style: {
              base: {
                iconColor: "#ad89a6",
                color: "#2f2b31",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": {
                  color: "#6b516d",
                },
                "::placeholder": {
                  color: "#6b516d",
                },
              },
              invalid: {
                iconColor: "#ed4f32",
                color: "#ed4f32",
              },
            },
          }}
        />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay &#36;
        {product &&
          (product.price + product.price * product.tax_percent).toFixed(2)}
      </button>
    </CheckoutStyled>
  )
}

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

const Stripe = ({ product, formData, setPaymentActive, sendEmailToServer }) => {
  const [status, setStatus] = useState("ready")

  if (status === "success") {
    return <div>Purchase was successful!</div>
  }
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckout
        product={product}
        formData={formData}
        setPaymentActive={setPaymentActive}
        sendEmailToServer={sendEmailToServer}
        success={() => {
          setStatus("success")
        }}
      />
    </Elements>
  )
}

const CheckoutStyled = styled.form`
  width: 100% !important;
  text-align: center;
  margin-top: 3rem;

  label {
    ${Nav1CharcoalGrey};
    margin: 0;

    &:hover {
      color: ${colors.colorAlt};
      cursor: inherit;
    }
  }

  .card-input {
    width: 100%;
    padding: 2rem;
    border: solid 0.1rem #6b516d;
  }

  button {
    ${Btn1DarkPurple};
    margin-top: 3rem;
  }
`

export default Stripe
