import React, { useState, useRef, useEffect, useContext } from "react"
import axios from "axios"
import { UserContext } from "../../../../context/UserContext"
import { navigate } from "gatsby"

const isBrowser = () => typeof window !== "undefined"

const PayPal = ({ productType }) => {
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
  const paypalRef = useRef(null)

  const setOneBooking = data => {
    setPaymentDetails({
      name: "One Booking",
      price: data.booking_one_price,
      description: data.booking_one_description,
      details: data.booking_one_includes_details,
      terms: data.booking_one_purchase_terms,
      active: true,
    })
  }

  const setSmilePass = data => {
    setPaymentDetails({
      name: "10 Smile Pass",
      price: data.ten_pass_price,
      description: data.ten_pass_description,
      details: data.ten_pass_includes_details,
      terms: data.ten_pass_purchase_terms,
      active: true,
    })
  }

  const setMembership = data => {
    setPaymentDetails({
      name: "Monthly Membership",
      price: data.smile_member_price,
      description: data.smile_member_description,
      details: data.smile_member_included_details,
      terms: data.smile_member_purchase_terms,
      active: true,
    })
  }

  const getProductDataFromServer = async () => {
    try {
      const reponse = await axios.get(
        `${process.env.GATSBY_API_URL}/booking-packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (productType === "onebooking") {
        setOneBooking(reponse.data)
      } else if (productType === "smilepass") {
        setSmilePass(reponse.data)
      } else if (productType === "membership") {
        setMembership(reponse.data)
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

  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.GATSBY_PAYPAL_CLIENT_ID}&currency=CAD`
    script.addEventListener("load", () => setLoaded(true))
    document.body.appendChild(script)
    return function cleanup() {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (isBrowser() && loaded && window.paypal) {
      getProductDataFromServer()
    }
  }, [loaded])

  useEffect(() => {
    activatePayPalButton()
  }, [paymentDetails])

  const activatePayPalButton = async () => {
    if (isBrowser() && loaded && window.paypal) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: `Payment To Smile and Company`,
                  amount: {
                    currency_code: "CAD",
                    value: (
                      paymentDetails.price +
                      paymentDetails.price * 0.05
                    ).toFixed(2),
                    breakdown: {
                      item_total: {
                        currency_code: "CAD",
                        value: paymentDetails.price.toFixed(2),
                      },
                      tax_total: {
                        currency_code: "CAD",
                        value: (paymentDetails.price * 0.05).toFixed(2),
                      },
                    },
                  },
                  items: [
                    {
                      name: paymentDetails.name,
                      quantity: 1,
                      unit_amount: {
                        currency_code: "CAD",
                        value: paymentDetails.price.toFixed(2),
                      },
                    },
                  ],
                },
              ],
            })
          },
          onApprove: async (data, actions) => {
            dispatch({ type: "USER_LOADING" })
            const order = await actions.order.capture()
            const createdOrder = await handleCreateOrderRecord(order)
            dispatch({ type: "USER_LOADING" })
            if (createdOrder.payment_status === "COMPLETED") {
              // Now we need to update the profile. //
              await updateProfileAfterOrderSuccess(createdOrder)
              return navigate("/app/clinic-dashboard", { replace: true })
            } else {
              dispatch({
                type: "USER_ERROR",
                payload: {
                  message:
                    "Something went wrong with your payment. Please contact Smile and Company for assistance.",
                },
              })
            }
          },
          onError: err => {
            console.error(err)
          },
        })
        .render(paypalRef.current)
    }
  }

  const handleCreateOrderRecord = async order => {
    try {
      const reponse = await axios.post(
        `${process.env.GATSBY_API_URL}/invoices/paypal`,
        { order, productType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({ type: "USER_LOADING_COMPLETE" })
      return reponse.data
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

  const updateProfileAfterOrderSuccess = async createdOrder => {
    try {
      const response = await axios.get(
        `${process.env.GATSBY_API_URL}/clinic-profiles/my-profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({
        type: "USER_UPDATE_PROFILE",
        payload: {
          profile: response.data,
          message: `Congratulations ${createdOrder.clinic_name}! Your credits have been successfully added to your account. You purchased the ${createdOrder.order_name}, you should recieved an email receipt to ${state.user.email} and you can always review your invoice history from your dashboard under invoices in the left side menu.`,
        },
      })
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
    <div>
      <div ref={paypalRef}></div>
    </div>
  )
}

export default PayPal
