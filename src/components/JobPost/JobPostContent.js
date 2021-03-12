import React from "react"
import styled from "styled-components"
import { medWrapper } from "../../styles/helpers"

import PostIntro from "./PostIntro"
import JobPostSidebar from "./JobPostSidebar"
import PostContent from "./PostContent"

const JobPostContent = ({ data }) => {
  return (
    <JobPostContentStyled>
      <div className="wrapper">
        <PostIntro />
        <JobPostSidebar />
        <PostContent data={data} />
      </div>
    </JobPostContentStyled>
  )
}

const JobPostContentStyled = styled.div`
  .wrapper {
    ${medWrapper};

    @media (max-width: 767px) {
      max-width: 50rem;
      padding: 0;
    }
  }
`

export default JobPostContent
