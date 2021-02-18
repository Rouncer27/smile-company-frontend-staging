import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import {
  B1CharcoalGrey,
  Btn1DarkPurple,
  colors,
  H4DarkPurple,
} from "../../styles/helpers"

const JobCard = ({ data, index }) => {
  const position = data.jobPostingData.titleOfPosition
  const clinic = data.jobPostingData.dentalClinicName
  const location = data.jobPostingData.location
  const datePosted = data.jobPostingData.datePosted
  const slug = data.slug
  return (
    <JobCardStyled index={index}>
      <div className="jobCardTop">
        <h2>{position}</h2>
        <h3>{clinic}</h3>
        <div className="jobCardTop__meta">
          <p>
            <span className="location">{location}</span>
            <span className="pipe"> &#124; </span>
            <span className="date">{datePosted}</span>
          </p>
        </div>
      </div>
      <div className="jobCardBot">
        <Link to={`/job-posting/${slug}`}>Read More</Link>
      </div>
    </JobCardStyled>
  )
}

const JobCardStyled = styled.div`
  width: 100%;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    ${props => console.log(props.index % 2)}
    width: calc(50% - 1.5rem);
    margin-right: ${props => (props.index % 2 ? "0rem" : "1.5rem")};
    margin-left: ${props => (props.index % 2 ? "1.5rem" : "0rem")};
    margin-bottom: 3rem;
  }

  .jobCardTop {
    width: 100%;
    padding: 2rem;
    background-color: rgba(173, 137, 166, 0.5);

    h2,
    h3 {
      ${H4DarkPurple};
      margin: 0;
      text-align: center;
    }

    &__meta {
      text-align: center;
      margin-top: 2rem;

      p {
        ${B1CharcoalGrey};
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 0;

        .location {
          flex: 2;
          display: inline-block;
          text-align: center;
        }

        .pipe {
          flex: 1;
          display: inline-block;
          margin: 0 1rem;
          color: ${colors.colorSecondary};
        }

        .date {
          flex: 2;
          display: inline-block;
          text-align: center;
        }
      }
    }
  }

  .jobCardBot {
    width: 100%;
    padding: 2rem;
    background-color: ${colors.colorPrimary};
    text-align: center;

    a {
      ${Btn1DarkPurple};
    }
  }
`

export default JobCard
