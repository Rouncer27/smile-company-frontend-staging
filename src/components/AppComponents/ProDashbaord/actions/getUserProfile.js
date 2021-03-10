import axios from "axios"
import displayErrorMessage from "./displayErrorMessage"

export default async (token, userId, confirmed, dispatch) => {
  if (!userId) return
  if (!confirmed) return

  dispatch({ type: "USER_LOADING" })

  try {
    const response = await axios.get(
      `${process.env.GATSBY_API_URL}/professional-profiles/my-profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    dispatch({
      type: "USER_GET_PROFILE",
      payload: { profile: response.data },
    })
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}