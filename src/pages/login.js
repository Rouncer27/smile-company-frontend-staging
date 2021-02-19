import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import MainLogin from "../components/AppComponents/AppLogin/MainLogin"

const Login = () => {
  return (
    <Layout>
      <SEO title="Smile and Copmany" />
      <MainLogin />
    </Layout>
  )
}

export default Login
