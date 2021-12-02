import axios from "axios"
import { navigate } from "gatsby"
import displayErrorMessage from "./displayErrorMessage"

export default async dispatch => {
  dispatch({ type: "USER_LOADING" })
  try {
    const reponse = await axios.get(`${process.env.GATSBY_API_URL}/users/me`, {
      withCredentials: true,
    })

    const user = reponse.data
    const isEmailConfirmed = user.confirmed

    if (isEmailConfirmed) {
      dispatch({ type: "USER_UPDATE", payload: { user } })
      navigate("/app/professional-dashboard/general", { replace: true })
    } else {
      dispatch({
        type: "USER_ALERT",
        payload: {
          message: `Your email account still needs to be confirmed. Please check your inbox and click the confirmation link that was sent to ${user.email}`,
        },
      })
    }
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}
