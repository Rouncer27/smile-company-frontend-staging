import axios from "axios"
import { navigate } from "gatsby"

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
      navigate("/app/clinic-dashboard/profile-settings", { replace: true })
    } else {
      dispatch({
        type: "USER_ALERT",
        payload: {
          message: `Your email account still needs to be confirmed. Please check your inbox and click the confirmation link that was sent to ${user.email}`,
        },
      })
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
