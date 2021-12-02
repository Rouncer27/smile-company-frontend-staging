import axios from "axios"

export default async (dispatch, setBookingDetails) => {
  try {
    const reponse = await axios.get(
      `${process.env.GATSBY_API_URL}/booking-packages`,
      {
        withCredentials: true,
      }
    )

    setBookingDetails({
      booking_one_description: reponse.data.booking_one_description
        ? reponse.data.booking_one_description
        : "",
      booking_one_includes_details: reponse.data.booking_one_includes_details
        ? reponse.data.booking_one_includes_details
        : "",
      booking_one_price: reponse.data.booking_one_price
        ? reponse.data.booking_one_price
        : null,
      booking_one_purchase_terms: reponse.data.booking_one_purchase_terms
        ? reponse.data.booking_one_purchase_terms
        : "",
      ten_pass_description: reponse.data.ten_pass_description
        ? reponse.data.ten_pass_description
        : "",
      ten_pass_includes_details: reponse.data.ten_pass_includes_details
        ? reponse.data.ten_pass_includes_details
        : "",
      ten_pass_price: reponse.data.ten_pass_price
        ? reponse.data.ten_pass_price
        : null,
      ten_pass_purchase_terms: reponse.data.ten_pass_purchase_terms
        ? reponse.data.ten_pass_purchase_terms
        : "",
      smile_member_description: reponse.data.smile_member_description
        ? reponse.data.smile_member_description
        : "",
      smile_member_included_details: reponse.data.smile_member_included_details
        ? reponse.data.smile_member_included_details
        : "",
      smile_member_price: reponse.data.smile_member_price
        ? reponse.data.smile_member_price
        : null,
      smile_member_purchase_terms: reponse.data.smile_member_purchase_terms
        ? reponse.data.smile_member_purchase_terms
        : "",
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
