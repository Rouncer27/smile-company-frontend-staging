import axios from "axios"
import displayErrorMessage from "./displayErrorMessage"

export default async (token, id, dispatch) => {
  dispatch({ type: "USER_LOADING" })
  try {
    const response = await axios.put(
      `${process.env.GATSBY_API_URL}/bookings/ignore/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    dispatch({
      type: "USER_ALERT",
      payload: {
        message: response.data.message,
      },
    })
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}
