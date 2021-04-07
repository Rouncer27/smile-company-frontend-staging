import { Magic } from "magic-sdk"
import { navigate } from "gatsby"

let magic
if (typeof window !== "undefined") {
  magic = new Magic(process.env.GATSBY_MAGIC_PK)
}

export default async dispatch => {
  dispatch({ type: "USER_LOADING" })
  try {
    await magic.user.logout()
  } catch (err) {
    console.log(err)
  }
  dispatch({ type: "USER_LOGOUT" })
  navigate("/login", { replace: true })
}
