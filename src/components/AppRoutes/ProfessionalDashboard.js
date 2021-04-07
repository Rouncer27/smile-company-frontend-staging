import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"

const ProfessionalDashboard = () => {
  const [state, dispatch] = useContext(UserContext)
  return (
    <div>
      <div>
        <h1>My Dashboard</h1>
        <p>{state.user.email}</p>
      </div>
    </div>
  )
}

export default ProfessionalDashboard
