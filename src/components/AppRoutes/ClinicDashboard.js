import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"

import Dashboard from "../AppComponents/ClinicDashboard/Dashboard"

const ClinicDashboard = () => {
  const [state, dispatch] = useContext(UserContext)
  console.log("YOYOYOY: ", state)
  return <Dashboard />
}

export default ClinicDashboard
