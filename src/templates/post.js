import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import PostContent from "../components/PostComponents/PostContent"

const post = props => {
  const prevPost = props.pageContext.prev
  const nextPost = props.pageContext.next
  const { post, allPosts } = props.data

  const prevPostData = allPosts.edges.find(post => {
    return post.node.slug === prevPost
  })
  const nextPostData = allPosts.edges.find(post => {
    return post.node.slug === nextPost
  })

  const prevSlug = prevPostData && prevPostData.node && prevPostData.node.slug
  const nextSlug = nextPostData && nextPostData.node && nextPostData.node.slug

  return (
    <Layout>
      <SEO title="Page Template" />
      <PostContent
        data={post}
        prevPostSlug={prevSlug}
        nextPostSlug={nextSlug}
      />
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

    allPosts: allWpPost {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`

export default post
