import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

const JobPost = props => {
  const { jobPost } = props.data
  console.log({ jobPost })
  return (
    <Layout>
      <SEO title="Page Template" />
      <h1>JobPost</h1>
    </Layout>
  )
}

export const jobPostTempQuery = graphql`
  query jobPostTempPage($slug: String!) {
    jobPost: wpJobPosting(slug: { eq: $slug }) {
      title
      jobPostingData {
        content
        datePosted
        dentalClinicName
        fieldGroupName
        location
        titleOfPosition
      }
    }
  }
`

export default JobPost
