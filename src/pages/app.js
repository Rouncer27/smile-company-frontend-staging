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
import BookingsHistory from "../components/AppRoutes/clinic-dashboard/BookingsHistory"
import Invoices from "../components/AppRoutes/clinic-dashboard/Invoices"
import Invoice from "../components/AppRoutes/clinic-dashboard/Invoice"
import CreateBooking from "../components/AppRoutes/clinic-dashboard/CreateBooking"

import ProDashboard from "../components/AppRoutes/ProDashboard"
import DashboardGeneral from "../components/AppRoutes/pro-dashboard/GeneralSettings"
import Experience from "../components/AppRoutes/pro-dashboard/Experience"
import Availability from "../components/AppRoutes/pro-dashboard/Availability"
import Requests from "../components/AppRoutes/pro-dashboard/Requests"
import Approved from "../components/AppRoutes/pro-dashboard/Approved"
import History from "../components/AppRoutes/pro-dashboard/History"

const App = ({ location }) => {
  const [state] = useContext(UserContext)
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
              path={`/app/clinic-dashboard/bookings-history`}
              component={BookingsHistory}
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
              component={ProDashboard}
            />
            <PrivateRoute
              path="/app/professional-dashboard/general"
              component={DashboardGeneral}
            />
            <PrivateRoute
              path="/app/professional-dashboard/experience"
              component={Experience}
            />
            <PrivateRoute
              path="/app/professional-dashboard/availability"
              component={Availability}
            />
            <PrivateRoute
              path="/app/professional-dashboard/booking-requests"
              component={Requests}
            />
            <PrivateRoute
              path="/app/professional-dashboard/booking-approved"
              component={Approved}
            />
            <PrivateRoute
              path="/app/professional-dashboard/bookings-history"
              component={History}
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
