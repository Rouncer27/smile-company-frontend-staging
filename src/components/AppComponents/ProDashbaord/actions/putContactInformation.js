import axios from "axios"
import { navigate } from "gatsby"
import displayErrorMessage from "./displayErrorMessage"

export default async (token, profileId, dispatch, formData) => {
  dispatch({ type: "USER_LOADING" })
  try {
    const response = await axios.put(
      `${process.env.GATSBY_API_URL}/professional-profiles/contact/${profileId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    dispatch({
      type: "USER_UPDATE_PROFILE",
      payload: {
        profile: response,
        message: `Congratulations! You have successfully updated your profile.`,
      },
    })
    return navigate("/app/professional-dashboard", { replace: true })
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}
