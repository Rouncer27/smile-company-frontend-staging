import axios from "axios"
import { navigate } from "gatsby"

export default async (token, dispatch) => {
  dispatch({ type: "USER_LOADING" })
  try {
    const reponse = await axios.get(`${process.env.GATSBY_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = reponse.data
    const isEmailConfirmed = user.confirmed

    if (isEmailConfirmed) {
      dispatch({ type: "USER_UPDATE", payload: { token, user } })
      navigate("/app/professional-dashboard/general", { replace: true })
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
