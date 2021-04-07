import axios from "axios"
import displayErrorMessage from "./displayErrorMessage"

import magicLogoutUser from "../../ClinicDashboard/actions/magicLogoutUser"
import isUserLoggedIn from "../../ClinicDashboard/actions/isUserLoggedIn"

import { navigate } from "gatsby"

const getProfileFromServer = async (token, userId, dispatch) => {
  console.log("THIS IS THE TOKEN CHECK:", token)
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
}

export default async (token, userId, confirmed, dispatch) => {
  if (!userId) return
  if (!confirmed) return

  dispatch({ type: "USER_LOADING" })

  try {
    await getProfileFromServer(token, userId, dispatch)
  } catch (err) {
    const liveToken = await isUserLoggedIn()
    console.log("THIS IS THE isUserLoggedIn responce: ", liveToken)

    if (liveToken) {
      try {
        await getProfileFromServer(liveToken, userId, dispatch)
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
