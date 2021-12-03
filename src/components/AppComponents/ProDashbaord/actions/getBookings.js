import axios from "axios"
import displayErrorMessage from "./displayErrorMessage"

export default async (token, userId, confirmed, dispatch, approved) => {
  if (!userId) return
  if (!confirmed) return
  if (!approved) return

  dispatch({ type: "USER_LOADING" })

  try {
    const response = await axios.get(
      `${process.env.GATSBY_API_URL}/bookings/professionals/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: "USER_GET_BOOKINGS",
      payload: { bookings: response.data },
    })
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}
