import React, { useContext } from "react"
import { UserContext } from "../../../context/UserContext"

import SettingsDashboard from "../../../components/AppComponents/ClinicDashboard/SettingsDashboard"

const ProfileSettings = () => {
  const [state, dispatch] = useContext(UserContext)
  console.log(state)
  return <SettingsDashboard />
}

export default ProfileSettings
