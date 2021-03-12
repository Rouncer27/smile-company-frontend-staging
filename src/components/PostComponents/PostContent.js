import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import {
  H1DarkPurple,
  Nav1CharcoalGrey,
  standardWrapper,
} from "../../styles/helpers"

import PostImage from "./PostImage"
import PostTitle from "./PostTitle"
import PostWysiwyg from "./PostWysiwyg"

const PostContent = ({ data, prevPostSlug, nextPostSlug }) => {
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
      <div className="postNav">
        {nextPostSlug && (
          <div>
            <Link to={`/news/${nextPostSlug}`}>
              <span>&#8592;</span> Next Article
            </Link>
          </div>
        )}
        <div>
          <Link to="/news">Home</Link>
        </div>
        {prevPostSlug && (
          <div>
            <Link to={`/news/${prevPostSlug}`}>
              Previous Article <span>&#8594;</span>
            </Link>
          </div>
        )}
      </div>
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

    @media (max-width: 767px) {
      max-width: 50rem;
    }

    @media (min-width: 1025px) {
      max-width: 90rem;
    }
  }

  .postNav {
    ${standardWrapper};
    justify-content: space-between;
    margin-bottom: 5rem;

    @media (min-width: 1025px) {
      max-width: 90rem;
    }

    div {
      flex: 1;
      margin: 0 2rem;
      text-align: center;
    }

    a {
      ${Nav1CharcoalGrey};
      text-transform: uppercase;
    }

    div:first-of-type {
      margin-left: 0;
      text-align: left;
    }

    div:last-of-type {
      margin-right: 0;
      text-align: right;
    }
  }
`

export default PostContent
