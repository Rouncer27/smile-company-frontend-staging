import React, { useContext } from "react"
import { UserContext } from "../../../context/UserContext"

import Layout from "../../../components/Layout"
import SEO from "../../../components/SEO"
import SettingsDashboard from "../../../components/AppComponents/ClinicDashboard/SettingsDashboard"

const ProfileSettings = () => {
  const [state, dispatch] = useContext(UserContext)
  console.log(state)
  return (
    <Layout>
      <SEO title="Clinic Dashbard" />
      <SettingsDashboard />
    </Layout>
  )
}

export default ProfileSettings
