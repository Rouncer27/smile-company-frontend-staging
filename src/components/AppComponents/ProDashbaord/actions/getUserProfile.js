import axios from "axios"
import displayErrorMessage from "./displayErrorMessage"

import { navigate } from "gatsby"

const getProfileFromServer = async (token, userId, dispatch) => {
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
    payload: { token, profile: response.data },
  })

  return response.data.user_approved
}

export default async (token, userId, confirmed, dispatch) => {
  if (!userId) {
    navigate("/login", { replace: true })
    return
  }
  if (!confirmed) {
    navigate("/app/professional-dashboard", { replace: true })
    return
  }
  dispatch({ type: "USER_LOADING" })
  try {
    const userApproved = await getProfileFromServer(token, userId, dispatch)
    return { token, userApproved }
  } catch (err) {
    displayErrorMessage(err, dispatch)
    dispatch({ type: "USER_LOGOUT" })
    navigate("/login", { replace: true })
  }
}
