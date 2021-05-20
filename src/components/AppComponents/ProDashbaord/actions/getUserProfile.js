import axios from "axios"
import displayErrorMessage from "./displayErrorMessage"

import magicLogoutUser from "../../ClinicDashboard/actions/magicLogoutUser"
import isUserLoggedIn from "../../ClinicDashboard/actions/isUserLoggedIn"

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
  if (!userId) return
  if (!confirmed) return
  dispatch({ type: "USER_LOADING" })
  try {
    const userApproved = await getProfileFromServer(token, userId, dispatch)

    return { token, userApproved }
  } catch (err) {
    const liveToken = await isUserLoggedIn()
    if (liveToken) {
      try {
        const userApproved = await getProfileFromServer(
          liveToken,
          userId,
          dispatch
        )

        return { token: liveToken, userApproved }
      } catch (err) {
        displayErrorMessage(err, dispatch)
        magicLogoutUser(dispatch)
      }
    } else {
      displayErrorMessage(err, dispatch)
      dispatch({ type: "USER_LOGOUT" })
      navigate("/login", { replace: true })
    }
  }
}
