import { navigate } from "gatsby"

export default dispatch => {
  dispatch({ type: "USER_LOGOUT" })
  navigate("/app/login", { replace: true })
}
