import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import JobPostContent from "../components/JobPost/JobPostContent"

const JobPost = props => {
  const { jobPost } = props.data
  return (
    <Layout>
      <SEO
        title={jobPost.title}
        description={jobPost.jobPostingData.content}
        location={props.location.pathname}
      />
      <JobPostContent data={jobPost} />
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
