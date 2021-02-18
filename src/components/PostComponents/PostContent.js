import React from "react"
import styled from "styled-components"
import { H1DarkPurple, standardWrapper } from "../../styles/helpers"

import PostImage from "./PostImage"
import PostTitle from "./PostTitle"
import PostWysiwyg from "./PostWysiwyg"

const PostContent = ({ data }) => {
  console.log({ data })
  return (
    <PostContentStyled>
      <div className="headline">
        <p>News and Updates</p>
      </div>
      <article>
        <div className="wrapper">
          <PostImage
            image={
              data.newsAndUpdates.featuredImage.localFile.childImageSharp.fluid
            }
          />
          <PostTitle title={data.title} date={data.date} />
          <PostWysiwyg content={data.newsAndUpdates.mainContent} />
        </div>
      </article>
    </PostContentStyled>
  )
}

const PostContentStyled = styled.main`
  margin-top: 9rem;

  .headline {
    padding: 0 2rem;
    text-align: center;

    p {
      ${H1DarkPurple};
      margin: 0;
    }
  }

  .wrapper {
    ${standardWrapper};

    @media (min-width: 1025px) {
      max-width: 90rem;
    }
  }
`

export default PostContent
