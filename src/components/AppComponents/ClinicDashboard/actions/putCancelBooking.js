import axios from "axios"

export default async (dispatch, profile, currentBooking) => {
  dispatch({ type: "USER_LOADING" })

  try {
    const response = await axios.put(
      `${process.env.GATSBY_API_URL}/bookings/cancel/${currentBooking.id}`,
      { id: profile.id },
      {
        withCredentials: true,
      }
    )

    dispatch({
      type: "USER_ALERT",
      payload: { message: response.data.message },
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
