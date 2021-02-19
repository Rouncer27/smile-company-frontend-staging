import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import MainClinic from "../components/AppComponents/ClinicSignUp/MainClinic"

const DentalClinicSignup = () => {
  return (
    <Layout>
      <SEO title="Smile and Copmany" />
      <MainClinic />
    </Layout>
  )
}

export default DentalClinicSignup
