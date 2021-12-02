import axios from "axios"
import { navigate } from "gatsby"

export default async (dispatch, formData) => {
  dispatch({ type: "USER_LOADING" })
  try {
    await axios.post(`${process.env.GATSBY_API_URL}/bookings`, formData, {
      withCredentials: true,
    })

    dispatch({
      type: "USER_ALERT",
      payload: {
        message: `Congratulations! You have created a booking. You can always review your bookings history from your dashboard under Review Booking in the left side menu.`,
      },
    })
    return navigate("/app/clinic-dashboard", { replace: true })
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
