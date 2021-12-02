import axios from "axios"
import { navigate } from "gatsby"
import displayErrorMessage from "./displayErrorMessage"

export default async dispatch => {
  dispatch({ type: "USER_LOADING" })

  try {
    await axios.post(
      `${process.env.GATSBY_API_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    )

    dispatch({ type: "USER_LOGOUT" })
    navigate("/login", { replace: true })
    dispatch({
      type: "USER_ALERT",
      payload: { messgae: "You have been logged out of your account." },
    })
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}
