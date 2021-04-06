import axios from "axios"
import isUserLoggedIn from "./isUserLoggedIn"
import displayErrorMessage from "./displayErrorMessage"

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
    payload: { profile: response.data },
  })
}

export default async (token, userId, dispatch) => {
  dispatch({ type: "USER_LOADING" })
  try {
    await getProfileFromServer(token, userId, dispatch)
  } catch (err) {
    console.log("HERE IS THE USER ERROR:", err.response.data)
    const liveToken = await isUserLoggedIn()
    console.log(liveToken)
    if (liveToken) {
      console.log("THERE WAS A TOKEN FROM MAGIC")
      try {
        console.log("Try getting the user profile with new token")
        await getProfileFromServer(liveToken, userId, dispatch)
      } catch (err) {
        console.log("STILL an error... log them out")
        displayErrorMessage(err, dispatch)
      }
    } else {
      console.log("NO TOKEN FROM MAGIC... log them out")
      displayErrorMessage(err, dispatch)
    }
  }
}
