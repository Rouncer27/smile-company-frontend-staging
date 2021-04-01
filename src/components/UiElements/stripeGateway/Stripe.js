import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import StripeCheckout from "react-stripe-checkout"

const isBrowser = () => typeof window !== "undefined"

const Checkout = () => {
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      console.log("hello")
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
    }
  }

  return <div>hello</div>
}

const Stripe = ({
  productType,
  formData,
  setPaymentActive,
  sendEmailToServer,
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (isBrowser() && loaded) {
      // getProductDataFromServer()
    }
  }, [loaded])

  async function handleToken(token, addresses) {
    console.log(token, addresses)

    const response = await axios.post(
      `${process.env.GATSBY_API_URL}/invoice-permanent-hirings`,
      { token, packageId: "permanent-placement", addresses, formData }
    )
    const { status } = response.data
    if (status === "success") {
      console.log("response from server: ", response)
      setPaymentActive(false)
      sendEmailToServer()
    } else {
      // something went wrong
      setPaymentActive(false)
      sendEmailToServer()
    }
  }

  return (
    <CheckoutStyled>
      <StripeCheckout
        stripeKey={process.env.GATSBY_STRIPE_PK}
        token={handleToken}
        currency="CAD"
        amount={840 * 100}
        panelLabel="Payment for Permanent Hiring Registration"
        name="Permanent Hiring Registration Form"
        billingAddress
        email={formData.email}
      />
    </CheckoutStyled>
  )
}

const CheckoutStyled = styled.div`
  width: 100%;
  text-align: center;
`

export default Stripe
