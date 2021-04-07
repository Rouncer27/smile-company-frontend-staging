import axios from "axios"
import isUserLoggedIn from "./isUserLoggedIn"
import magicLogoutUser from "./magicLogoutUser"
import displayErrorMessage from "./displayErrorMessage"

import { navigate } from "gatsby"

const getProfileFromServer = async (token, userId, dispatch) => {
  console.log("CALL TO THE SERVER FOR PROFILE")
  const response = await axios.get(
    `${process.env.GATSBY_API_URL}/clinic-profiles/my-profile/${userId}`,
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
}

export default async (token, userId, dispatch) => {
  dispatch({ type: "USER_LOADING" })
  try {
    await getProfileFromServer(token, userId, dispatch)
    return token
  } catch (err) {
    const liveToken = await isUserLoggedIn()
    if (liveToken) {
      try {
        await getProfileFromServer(liveToken, userId, dispatch)
        return liveToken
      } catch (err) {
        displayErrorMessage(err, dispatch)
        magicLogoutUser(dispatch)
      }
    } else {
      displayErrorMessage(err, dispatch)
      dispatch({ type: "USER_LOGOUT" })
      navigate("/app/login", { replace: true })
    }
  }
}
