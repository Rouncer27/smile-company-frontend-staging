import axios from "axios"
import displayErrorMessage from "./displayErrorMessage"
import { navigate } from "gatsby"

const getProfileFromServer = async (token, userId, dispatch) => {
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
    console.log(err)
    displayErrorMessage(err, dispatch)
    dispatch({ type: "USER_LOGOUT" })
    navigate("/login", { replace: true })
  }
}
