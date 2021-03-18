import axios from "axios"
import { navigate } from "gatsby"
import displayErrorMessage from "./displayErrorMessage"

export default async (token, id, profile, cart, user, dispatch) => {
  try {
    const reponse = await axios.post(
      `${process.env.GATSBY_API_URL}/invoices/stripe-sub`,
      { id, profile, cart },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log(
      "RESPONCE FROM SERVER MEMBERSHIP: ",
      reponse.data.payment_status
    )

    if (reponse.data.payment_status === "succeeded") {
      dispatch({ type: "CLEAR_CART" })
      dispatch({ type: "USER_UPDATE", payload: { token, user } })
      navigate("/app/clinic-dashboard", { replace: true })
    }
  } catch (err) {
    displayErrorMessage(err, dispatch)
  }
}
