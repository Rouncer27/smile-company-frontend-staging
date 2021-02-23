import React, { useContext } from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import { UserContext } from "../context/UserContext"

import PrivateRoute from "../components/PrivateRoute"
import Login from "../components/AppRoutes/Login"
import NotFoundPage from "../components/NotFoundPage"
import ClinicDashboard from "../components/AppRoutes/ClinicDashboard"
import ProfessionalDashboard from "../components/AppRoutes/ProfessionalDashboard"

const App = () => {
  const [state] = useContext(UserContext)
  return (
    <Layout>
      <Router>
        <PrivateRoute
          path="/app/clinic-dashboard"
          component={ClinicDashboard}
        />
        <PrivateRoute
          path="/app/professional-dashboard"
          component={ProfessionalDashboard}
        />
        <Login path="/app/login" />
        <NotFoundPage path="/app/*" />
      </Router>
    </Layout>
  )
}

export default App
