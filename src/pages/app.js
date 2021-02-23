import React, { useContext } from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import { UserContext } from "../context/UserContext"

import PrivateRoute from "../components/PrivateRoute"
import Login from "../components/AppRoutes/Login"
import ForgotPassword from "../components/AppRoutes/ForgotPassword"
import ResetPassword from "../components/AppRoutes/ResetPassword"
import NotFoundPage from "../components/NotFoundPage"

import ClinicDashboard from "../components/AppRoutes/ClinicDashboard"
import ProfileSettings from "../components/AppRoutes/clinic-dashboard/ProfileSettings"

import ProfessionalDashboard from "../components/AppRoutes/ProfessionalDashboard"

const App = ({ location }) => {
  const [state] = useContext(UserContext)
  return (
    <Layout>
      <Router>
        <PrivateRoute
          path="/app/clinic-dashboard"
          component={ClinicDashboard}
        />
        <PrivateRoute
          path="/app/clinic-dashboard/profile-settings"
          component={ProfileSettings}
        />

        <PrivateRoute
          path="/app/professional-dashboard"
          component={ProfessionalDashboard}
        />
        <Login path="/app/login" />
        <ForgotPassword path="/app/forgot" />
        <ResetPassword path="/app/reset-password" location={location} />
        <NotFoundPage path="/app/*" />
      </Router>
    </Layout>
  )
}

export default App
