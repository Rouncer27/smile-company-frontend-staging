import React from "react"
import styled from "styled-components"
import moment from "moment"
import {
  B2CharcoalGrey,
  Btn1DarkPurple,
  H4DarkPurple,
} from "../../styles/helpers"

import JobWysiwyg from "./JobWysiwyg"
import { Link } from "gatsby"

const PostContent = ({ data }) => {
  console.log(data)
  return (
    <PostContentStyled>
      <div className="jobTitles">
        <h2>{data.jobPostingData.titleOfPosition}</h2>
        <h3>{data.jobPostingData.dentalClinicName}</h3>
      </div>
      <div className="jobLocation">
        <div className="jobLocation__location">
          <p>{data.jobPostingData.location}</p>
        </div>
        <div className="jobLocation__spacer"> &#124; </div>
        <div className="jobLocation__date">
          <p>{moment(data.jobPostingData.datePosted).format("MMM Do YYYY")}</p>
        </div>
      </div>
      <div className="mainJobContent">
        <JobWysiwyg content={data.jobPostingData.content} />
      </div>
      <div className="jobNav">
        <Link to="/permanent-hiring/job-board">Back to Job Board</Link>
      </div>
    </PostContentStyled>
  )
}

const PostContentStyled = styled.div`
  width: calc(100%);
  margin-bottom: 4rem;
  padding: 4rem;
  background-color: rgba(208, 204, 202, 0.25);

  @media (min-width: 768px) {
    width: calc(66.66% - 1rem);
    margin-left: 1rem;
  }

  .jobTitles {
    width: 100%;

    h2,
    h3 {
      ${H4DarkPurple};
      margin: 0;
    }
  }

  .jobLocation {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    margin-top: 3rem;

    &__spacer {
      width: 1.5%;
      text-align: center;
    }

    &__location,
    &__date {
      width: 25%;

      p {
        ${B2CharcoalGrey};
        margin: 0;
      }
    }

    &__date {
      text-align: right;
    }
  }

  .mainJobContent {
    width: 100%;
  }

  .jobNav {
    width: 100%;

    a {
      ${Btn1DarkPurple};
    }
  }
`

export default PostContent
