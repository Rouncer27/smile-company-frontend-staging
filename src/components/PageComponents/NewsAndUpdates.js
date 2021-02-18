import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Btn1DarkPurple, medWrapper } from "../../styles/helpers"

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

  const [postsData, setPostsData] = useState({
    posts: [],
    displayedPosts: [],
    nextCurrent: 3,
    morePosts: false,
    initalLoad: true,
  })

  useEffect(() => {
    console.log(postsData.posts.length)
    setPostsData({
      ...postsData,
      posts: [...posts],
      totalNumPosts: posts.length,
      displayedPosts:
        posts.length > 0 ? posts.slice(0, postsData.nextCurrent) : [],
      nextCurrent: (postsData.nextCurrent += 3),
    })
  }, [])

  const handleLoadMore = () => {
    setPostsData({
      ...postsData,
      posts: [...posts],
      displayedPosts:
        posts.length > 0 ? posts.slice(0, postsData.nextCurrent) : [],
      nextCurrent: (postsData.nextCurrent += 3),
      initalLoad: false,
    })
  }

  return (
    <NewsAndUpdatesStyled>
      <div className="wrapper">
        {havePosts ? (
          postsData.displayedPosts.map(post => (
            <PostCard
              key={post.node.id}
              post={post.node}
              loadTime={postsData.initalLoad}
            />
          ))
        ) : (
          <div>No posts Found!</div>
        )}
        <div className="loadMore">
          <button
            disabled={
              postsData.displayedPosts.length === postsData.posts.length
            }
            onClick={handleLoadMore}
            type="button"
          >
            Load More
          </button>
        </div>
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

  .loadMore {
    width: 100%;
    text-align: center;
    margin-top: 5rem;

    button {
      ${Btn1DarkPurple};
    }
  }
`

export default NewsAndUpdates
