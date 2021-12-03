import axios from "axios"

const setOneBooking = (data, setPaymentDetails) => {
  setPaymentDetails({
    name: "One Booking",
    qty: 1,
    price: data.booking_one_price,
    description: data.booking_one_description,
    details: data.booking_one_includes_details,
    terms: data.booking_one_purchase_terms,
    active: true,
  })
}

const setSmilePass = (data, setPaymentDetails) => {
  setPaymentDetails({
    name: "10 Smile Pass",
    qty: 1,
    price: data.ten_pass_price,
    description: data.ten_pass_description,
    details: data.ten_pass_includes_details,
    terms: data.ten_pass_purchase_terms,
    active: true,
  })
}

const setMembership = (data, setPaymentDetails) => {
  setPaymentDetails({
    name: "Monthly Membership",
    qty: 1,
    price: data.smile_member_price,
    description: data.smile_member_description,
    details: data.smile_member_included_details,
    terms: data.smile_member_purchase_terms,
    active: true,
  })
}

const setCancelFee = (numFees, setPaymentDetails) => {
  setPaymentDetails({
    name: "Short Notice Cancellation Fee",
    qty: numFees,
    price: 50 * numFees,
    description:
      "Cancellation fee for requesting a short notice cancelling of a temp job booking.",
    details: "$50 Fee for each short notice cancellation",
    terms: "Must be paid before you can create any other bookings.",
    active: true,
  })
}

export default async (
  token,
  productType,
  dispatch,
  numFees,
  setPaymentDetails
) => {
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
      setOneBooking(reponse.data, setPaymentDetails)
    } else if (productType === "smilepass") {
      setSmilePass(reponse.data, setPaymentDetails)
    } else if (productType === "membership") {
      setMembership(reponse.data, setPaymentDetails)
    } else if (productType === "fee") {
      setCancelFee(numFees, setPaymentDetails)
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
