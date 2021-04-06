import { Magic } from "magic-sdk"
import axios from "axios"

const magic = new Magic(process.env.GATSBY_MAGIC_PK)

const getUserDataFromServer = async (token, dispatch) => {
  try {
    const response = await axios.get(`${process.env.GATSBY_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch({ type: "USER_LOGIN", payload: { token, user: response.data } })
  } catch (err) {
    console.log(err)
  }
}

const getTokenFromMagic = async () => {
  try {
    const token = await magic.user.getIdToken()
    return token
  } catch (err) {
    console.log(err)
  }
}

export default async dispatch => {
  console.log("CALLED USER CHECK")
  dispatch({ type: "USER_LOADING" })
  try {
    const isLoggedIn = await magic.user.isLoggedIn()
    if (isLoggedIn) {
      const token = await getTokenFromMagic()
      await getUserDataFromServer(token, dispatch)
    } else {
      dispatch({ type: "USER_LOGOUT" })
    }
  } catch (err) {
    console.log(err)
    // setIsInitLoad(false)
    dispatch({ type: "USER_LOGOUT" })
  }
}
