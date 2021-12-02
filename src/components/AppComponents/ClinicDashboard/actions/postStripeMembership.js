import axios from "axios"
import { navigate } from "gatsby"
import displayErrorMessage from "./displayErrorMessage"

export default async (id, profile, cart, user, dispatch) => {
  try {
    const reponse = await axios.post(
      `${process.env.GATSBY_API_URL}/invoices/stripe-sub`,
      { id, profile, cart },
      {
        withCredentials: true,
      }
    )

    if (reponse.data.payment_status === "succeeded") {
      dispatch({ type: "CLEAR_CART" })
      dispatch({ type: "USER_UPDATE", payload: { user } })
      navigate("/app/clinic-dashboard", { replace: true })
    }
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}
