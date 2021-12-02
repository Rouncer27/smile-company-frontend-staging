import React, { useState, useContext, useEffect } from "react"
import { UserContext } from "../../../../context/UserContext"
import getProductData from "../actions/getProductData"
import { loadStripe } from "@stripe/stripe-js"
import styled from "styled-components"
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import {
  Btn1DarkPurple,
  Nav1CharcoalGrey,
  colors,
} from "../../../../styles/helpers"

import postStripePayment from "../actions/postStripePayment"
import postStripeMembership from "../actions/postStripeMembership"
import displayErrorMessage from "../actions/displayErrorMessage"

const isBrowser = () => typeof window !== "undefined"
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

const Checkout = ({ productType, profile }) => {
  const [state, dispatch] = useContext(UserContext)
  const stripe = useStripe()
  const elements = useElements()

  const { cart, user } = state

  const handleSubmit = async event => {
    event.preventDefault()
    dispatch({ type: "USER_LOADING" })
    try {
      // Check to see if this is a membership subscription or just a one time payment. //
      if (productType === "membership") {
        // Setup the payment method with stripe. //
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            email: profile.email,
          },
        })
        // If everything worked with Stripe then we can send the request to the server. //
        if (!error) {
          const { id } = paymentMethod
          postStripeMembership(id, profile, cart, user, dispatch)
        } else {
          dispatch({ type: "USER_ERROR", payload: { message: error.message } })
        }
      } else {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        })

        if (!error) {
          const { id } = paymentMethod
          postStripePayment(id, productType, cart, user, dispatch)
        } else {
          dispatch({ type: "USER_ERROR", payload: { message: error.message } })
        }
      }
    } catch (err) {
      displayErrorMessage(err, dispatch)
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
        Pay &#36;{state.cart.total}
      </button>
    </CheckoutStyled>
  )
}

const CheckoutStyled = styled.form`
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
    max-width: 60rem;
    padding: 2rem;
    border: solid 0.1rem #6b516d;
  }

  button {
    ${Btn1DarkPurple};
    margin-top: 3rem;
  }
`

const Stripe = ({ productType }) => {
  const [state, dispatch] = useContext(UserContext)
  const [loaded, setLoaded] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    name: "",
    price: "",
    description: "",
    details: "",
    terms: "",
    active: false,
  })
  const userId = state.user._id
  const profile = state.profile

  const getProductDataFromServer = async () => {
    await getProductData(
      productType,
      dispatch,
      state.profile.number_of_short_fees,
      setPaymentDetails
    )
  }

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (isBrowser() && loaded) {
      getProductDataFromServer()
    }
  }, [loaded])

  return (
    <Elements stripe={stripePromise}>
      <Checkout productType={productType} profile={profile} />
    </Elements>
  )
}

export default Stripe
