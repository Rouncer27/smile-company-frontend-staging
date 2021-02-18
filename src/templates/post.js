import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import PostContent from "../components/PostComponents/PostContent"

const post = props => {
  const { post } = props.data
  console.log({ post })
  return (
    <Layout>
      <SEO title="Page Template" />
      <PostContent data={post} />
    </Layout>
  )
}

export const postTempQuery = graphql`
  query postTempPage($slug: String!) {
    post: wpPost(slug: { eq: $slug }) {
      title
      date
      newsAndUpdates {
        mainContent
        featuredImage {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1250) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`

export default post
