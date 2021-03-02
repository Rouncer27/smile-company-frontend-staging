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
import BookingPackages from "../components/AppRoutes/clinic-dashboard/BookingPackages"
import Payments from "../components/AppRoutes/clinic-dashboard/Payments"
import Bookings from "../components/AppRoutes/clinic-dashboard/Bookings"
import Booking from "../components/AppRoutes/clinic-dashboard/Booking"
import Invoices from "../components/AppRoutes/clinic-dashboard/Invoices"
import Invoice from "../components/AppRoutes/clinic-dashboard/Invoice"
import CreateBooking from "../components/AppRoutes/clinic-dashboard/CreateBooking"

import ProfessionalDashboard from "../components/AppRoutes/ProfessionalDashboard"

const App = ({ location }) => {
  const [state] = useContext(UserContext)
  console.log(state)
  const { type } = state.user && state.user.role ? state.user.role : false
  return (
    <Layout>
      <Router>
        {type === "dental_clinics" && (
          <>
            <PrivateRoute
              path="/app/clinic-dashboard"
              component={ClinicDashboard}
            />
            <PrivateRoute
              path="/app/clinic-dashboard/profile-settings"
              component={ProfileSettings}
            />
            <PrivateRoute
              path="/app/clinic-dashboard/booking-packages"
              component={BookingPackages}
            />
            <PrivateRoute
              path="/app/clinic-dashboard/payment"
              component={Payments}
            />
            <PrivateRoute
              path={`/app/clinic-dashboard/create-booking`}
              component={CreateBooking}
            />
            <PrivateRoute
              path={`/app/clinic-dashboard/bookings`}
              component={Bookings}
            />
            <PrivateRoute
              path={`/app/clinic-dashboard/bookings/:id`}
              component={Booking}
            />
            <PrivateRoute
              path="/app/clinic-dashboard/invoices"
              component={Invoices}
            />
            <PrivateRoute
              path={`/app/clinic-dashboard/invoices/:id`}
              component={Invoice}
            />
          </>
        )}
        {type === "dental_professionals" && (
          <>
            <PrivateRoute
              path="/app/professional-dashboard"
              component={ProfessionalDashboard}
            />
          </>
        )}

        <Login path="/app/login" />
        <ForgotPassword path="/app/forgot" />
        <ResetPassword path="/app/reset-password" location={location} />
        <NotFoundPage path="/app/*" />
      </Router>
    </Layout>
  )
}

export default App
