import axios from "axios"
import { navigate } from "gatsby"
import displayErrorMessage from "./displayErrorMessage"

export default async (profileId, dispatch, formData) => {
  dispatch({ type: "USER_LOADING" })
  try {
    const response = await axios.put(
      `${process.env.GATSBY_API_URL}/professional-profiles/general/${profileId}`,
      formData,
      {
        withCredentials: true,
      }
    )

    dispatch({
      type: "USER_UPDATE_PROFILE",
      payload: {
        profile: response,
        message: `Congratulations! You have successfully updated your profile's general information.`,
      },
    })
    return navigate("/app/professional-dashboard", { replace: true })
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}
