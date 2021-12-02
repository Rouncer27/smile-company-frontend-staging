import axios from "axios"

export default async (userId, dispatch, bookingId, proId) => {
  if (!userId) return

  dispatch({ type: "USER_LOADING" })

  try {
    const response = await axios.put(
      `${process.env.GATSBY_API_URL}/bookings/accept/${bookingId}`,
      {
        bookingId: bookingId,
        proSelected: proId,
      },
      {
        withCredentials: true,
      }
    )

    dispatch({ type: "USER_LOADING_COMPLETE" })
    return response.data
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
