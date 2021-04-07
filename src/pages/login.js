import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

import Login from "../components/AppRoutes/Login"

const login = () => {
  return (
    <Layout>
      <SEO title="Smile and Copmany - Login to your dashboard." />
      <Login />
    </Layout>
  )
}

export default login
