import React, { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { navigate } from "gatsby"

import ResetPass from "../AppComponents/AppLogin/ResetPass"

const ResetPassword = ({ location }) => {
  const [state] = useContext(UserContext)

  useEffect(() => {
    const userRole = state.user && state.user.role && state.user.role.type
    if (userRole === "dental_clinics") {
      navigate("/app/clinic-dashboard", { replace: true })
    } else if (userRole === "dental_professionals") {
      navigate("/app/professional-dashboard", { replace: true })
    }
  }, [])

  return <ResetPass location={location} />
}

export default ResetPassword
