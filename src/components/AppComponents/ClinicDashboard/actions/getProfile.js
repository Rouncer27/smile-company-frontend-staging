import axios from "axios"
import displayErrorMessage from "./displayErrorMessage"
import { navigate } from "gatsby"

const getProfileFromServer = async (userId, dispatch) => {
  const response = await axios.get(
    `${process.env.GATSBY_API_URL}/clinic-profiles/my-profile/${userId}`,
    {
      withCredentials: true,
    }
  )

  dispatch({
    type: "USER_GET_PROFILE",
    payload: { profile: response.data },
  })
}

export default async (userId, dispatch) => {
  dispatch({ type: "USER_LOADING" })
  try {
    await getProfileFromServer(userId, dispatch)
  } catch (err) {
    console.log(err)
    displayErrorMessage(err, dispatch)
    dispatch({ type: "USER_LOGOUT" })
    navigate("/login", { replace: true })
  }
}
