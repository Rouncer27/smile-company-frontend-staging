import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Reset from "../components/AppRoutes/Reset"

const ResetPassword = props => {
  return (
    <Layout>
      <SEO />
      <Reset location={props.location.search} />
    </Layout>
  )
}

export default ResetPassword
