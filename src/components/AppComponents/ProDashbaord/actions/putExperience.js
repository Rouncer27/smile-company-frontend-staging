import axios from "axios"
import { navigate } from "gatsby"

export default async (token, profileId, dispatch, formData) => {
  dispatch({ type: "USER_LOADING" })
  try {
    const response = await axios.put(
      `${process.env.GATSBY_API_URL}/professional-profiles/experience/${profileId}`,
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
        message: `Congratulations! You have successfully updated your profile's experience information.`,
      },
    })
    return navigate("/app/professional-dashboard", { replace: true })
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
