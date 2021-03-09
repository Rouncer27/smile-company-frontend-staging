import axios from "axios"
import { navigate } from "gatsby"
import displayErrorMessage from "./displayErrorMessage"

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
    displayErrorMessage(err, dispatch)
  }
}
