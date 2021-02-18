import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { medWrapper } from "../../styles/helpers"

import PostCard from "./PostCard"

const getData = graphql`
  {
    posts: allWpPost {
      edges {
        node {
          id
          title
          date
          newsAndUpdates {
            excerpt
            featuredImage {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const NewsAndUpdates = () => {
  const data = useStaticQuery(getData)
  const posts = data.posts.edges
  const havePosts = posts && posts.length > 0

  return (
    <NewsAndUpdatesStyled>
      <div className="wrapper">
        {havePosts ? (
          posts.map((post, index) => (
            <PostCard key={post.node.id} post={post.node} index={index} />
          ))
        ) : (
          <div>No posts Found!</div>
        )}
      </div>
    </NewsAndUpdatesStyled>
  )
}

const NewsAndUpdatesStyled = styled.div`
  .wrapper {
    ${medWrapper};
    justify-content: flex-start;
    padding-bottom: 10rem;
  }
`

export default NewsAndUpdates
