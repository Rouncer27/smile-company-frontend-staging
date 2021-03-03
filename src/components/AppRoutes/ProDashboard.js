import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"

import Dashboard from "../AppComponents/ProDashbaord/Dashboard"

const ClinicDashboard = () => {
  const [state, dispatch] = useContext(UserContext)
  return <Dashboard />
}

export default ClinicDashboard
