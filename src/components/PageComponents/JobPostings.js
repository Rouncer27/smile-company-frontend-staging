import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "styled-components"
import {
  H2White,
  medWrapper,
  colors,
  B2White,
  Btn1LightSage,
} from "../../styles/helpers"

import JobCard from "./JobCard"

const getData = graphql`
  {
    jobPosts: allWpJobPosting {
      edges {
        node {
          slug
          id
          jobPostingData {
            datePosted
            dentalClinicName
            fieldGroupName
            location
            titleOfPosition
          }
        }
      }
    }
  }
`

const JobPostings = ({ data }) => {
  const jobData = useStaticQuery(getData)
  const jobPostings = jobData.jobPosts.edges

  return (
    <JobPostingsStyled>
      <div className="wrapper">
        <div className="postingSidebar">
          <div className="postingSidebar__title">
            <h3>{data.sidebarTitle}</h3>
          </div>
          <div
            className="postingSidebar__content"
            dangerouslySetInnerHTML={{ __html: data.sidebarContent }}
          />
          <div className="postingSidebar__link">
            <Link to={`/${data.sidebarButtonSlug}`}>
              {data.sidebarButtonText}
            </Link>
          </div>
        </div>
        <div className="postingContainer">
          {jobPostings.map((job, index) => (
            <JobCard key={job.node.id} data={job.node} index={index} />
          ))}
        </div>
      </div>
    </JobPostingsStyled>
  )
}

const JobPostingsStyled = styled.div`
  .wrapper {
    ${medWrapper};
  }

  .postingSidebar {
    align-self: flex-start;
    width: calc(100%);
    padding: 4rem;
    margin-bottom: 1.5rem;
    background-color: ${colors.colorTertiary};

    @media (min-width: 768px) {
      width: calc(33.33% - 1rem);
      margin-right: 1rem;
      margin-bottom: 0;
    }

    &__title {
      h3 {
        ${H2White};
      }
    }

    &__content {
      p {
        ${B2White};
      }
    }

    &__link {
      a {
        ${Btn1LightSage};
      }
    }
  }

  .postingContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: calc(100%);

    @media (min-width: 768px) {
      width: calc(66.66% - 1rem);
      margin-left: 1rem;
    }
  }
`

export default JobPostings
