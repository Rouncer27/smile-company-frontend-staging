import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { UserContext } from "../../../../context/UserContext"
import { navigate } from "gatsby"
import getProductData from "../actions/getProductData"
import { loadStripe } from "@stripe/stripe-js"
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"

import StripeCheckout from "react-stripe-checkout"

const isBrowser = () => typeof window !== "undefined"
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK)

const Checkout = ({ token, productType, profile }) => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      if (productType === "membership") {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            email: profile.email,
          },
        })

        if (!error) {
          const { id } = paymentMethod

          const reponse = await axios.post(
            `${process.env.GATSBY_API_URL}/invoices/stripe-sub`,
            { id, profile },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          console.log("RESPONCE FROM SERVER NOT MEMBERSHIP: ", reponse.data)
        }
      } else {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        })

        console.log(error, paymentMethod)

        if (!error) {
          const { id } = paymentMethod
          console.log(paymentMethod)

          const reponse = await axios.post(
            `${process.env.GATSBY_API_URL}/invoices/stripe`,
            { id, productType },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          console.log("RESPONCE FROM SERVER: ", reponse.data)
        }
      }
    } catch (err) {
      console.dir(err)
    }
  }

  return (
    <>
      <CardElement />
      <button onClick={handleSubmit} disabled={!stripe}>
        Pay
      </button>
    </>
  )
}

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
  const token = state.token
  const userId = state.user._id
  const profile = state.profile

  const getProductDataFromServer = async () => {
    await getProductData(
      token,
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

  console.log("paymentDetails", paymentDetails)

  return (
    <Elements stripe={stripePromise}>
      <Checkout token={token} productType={productType} profile={profile} />
      {/* <StripeCheckout
          stripeKey={process.env.GATSBY_STRIPE_PK}
          token={handleToken}
          billingAddress={false}
          currency="cad"
          amount={paymentDetails.price * 100}
          label={`Pay with Stripe`}
          name="Smile and Company"
        /> */}
    </Elements>
  )
}

export default Stripe
