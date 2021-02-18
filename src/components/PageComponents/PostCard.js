import React, { useState, useEffect } from "react"
import styled from "styled-components"
import BGImage from "gatsby-background-image"
import moment from "moment"
import Skeleton from "react-loading-skeleton"
import {
  B2CharcoalGrey,
  H4Lavender,
  Nav1CharcoalGrey,
} from "../../styles/helpers"

const PostCard = ({ post, index }) => {
  console.log({ post })
  const [postData, setPostData] = useState({
    featuredImage: "",
    mainTitle: "",
    mainExcerpt: "",
    mainDate: "",
  })

  useEffect(() => {
    setTimeout(() => {
      setPostData({
        ...postData,
        featuredImage:
          post.newsAndUpdates &&
          post.newsAndUpdates.featuredImage &&
          post.newsAndUpdates.featuredImage.localFile.childImageSharp.fluid,
        mainTitle: post.title,
        mainExcerpt: post.newsAndUpdates && post.newsAndUpdates.excerpt,
        mainDate: post.date && moment(post.date).format("MMM Do YY"),
      })
    }, 500 * index)
  }, [])

  return (
    <PostCardStyled>
      <div className="cardFeaturedImage">
        {postData.featuredImage ? (
          <BGImage tag="div" fluid={postData.featuredImage} />
        ) : (
          <Skeleton width={"100%"} height={"100%"} />
        )}
      </div>
      <div className="cardContent">
        <div>
          <h2>{postData.mainTitle || <Skeleton />}</h2>
        </div>
        <div className="cardContent__excerpt">
          {postData.mainExcerpt ? (
            <div dangerouslySetInnerHTML={{ __html: postData.mainExcerpt }} />
          ) : (
            <Skeleton count={4} />
          )}
        </div>
        <div className="cardContent__date">
          {postData.mainDate ? <p>{postData.mainDate}</p> : <Skeleton />}
        </div>
      </div>
    </PostCardStyled>
  )
}

const PostCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  @media (min-width: 768px) {
    width: calc(50%);
  }

  @media (min-width: 1025px) {
    width: calc(33.33% - 2rem);
    margin: 1rem;
  }

  .cardFeaturedImage {
    width: 100%;
    height: 20rem;

    div {
      width: 100%;
      height: 100%;
    }
  }

  .cardContent {
    flex: 1;
    padding: 3rem;
    background-color: rgba(208, 204, 202, 0.5);

    h2 {
      ${H4Lavender};
    }

    &__excerpt {
      min-height: 10rem;

      p {
        ${B2CharcoalGrey};
      }
    }

    &__date {
      margin-top: 1rem;
      p {
        ${Nav1CharcoalGrey};
        margin: 0;
      }
    }
  }
`

export default PostCard
