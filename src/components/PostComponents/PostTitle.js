import React from "react"
import styled from "styled-components"
import moment from "moment"

import { H2Lavender, Nav1CharcoalGrey } from "../../styles/helpers"

const PostTitle = ({ title, date }) => {
  return (
    <PostTitleStyled>
      <div className="mainTitle">
        <h2>{title}</h2>
      </div>
      <div className="mainDate">
        <p>{moment(date).format("MMM Do YY")}</p>
      </div>
    </PostTitleStyled>
  )
}

const PostTitleStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 4rem auto 2rem;

  .mainTitle {
    width: calc(50%);

    h2 {
      ${H2Lavender};
      margin: 0;
    }
  }

  .mainDate {
    width: calc(50%);
    text-align: right;

    p {
      ${Nav1CharcoalGrey};
      margin: 0;
      text-transform: uppercase;
    }
  }
`

export default PostTitle
