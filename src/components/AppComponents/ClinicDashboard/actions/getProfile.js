import axios from "axios"

export default async (token, userId, dispatch) => {
  dispatch({ type: "USER_LOADING" })
  try {
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
    // Not sure if this is need, but if there is a user error, left clear the state and have them refresh their token from Magic.
    dispatch({ type: "USER_LOGOUT" })
    dispatch({ type: "USER_ERROR", payload: { message } })
  }
}
