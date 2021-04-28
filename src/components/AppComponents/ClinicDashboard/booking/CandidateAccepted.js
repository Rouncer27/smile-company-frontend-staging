import React from "react"
import styled from "styled-components"
import {
  H4DarkPurple,
  colors,
  Nav1CharcoalGrey,
} from "../../../../styles/helpers"
import ProfessionalCard from "./ProfessionalCard"
import ProfileNotFound from "./ProfileNotFound"

const CandidateAccepted = ({ proSelected }) => {
  return (
    <CandidateAcceptedStyled>
      <div className="title">
        <h3>Candidate Accepted</h3>
        <p className="statusAlert">
          <span>CONFIRMED</span>
        </p>
      </div>
      <div className="bookingCandidates__wrapper">
        {proSelected === undefined ? (
          <ProfileNotFound />
        ) : (
          <ProfessionalCard
            pro={proSelected}
            bookingId={null}
            accepted={true}
          />
        )}
      </div>
    </CandidateAcceptedStyled>
  )
}

const CandidateAcceptedStyled = styled.div`
  .title {
    h3 {
      ${H4DarkPurple};
    }

    .statusAlert {
      ${Nav1CharcoalGrey};
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }

      span {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        background-color: ${colors.fulfilled};
        color: ${colors.black} !important;
        text-align: center;

        &:hover {
          color: ${colors.black};
        }
      }
    }
  }
`

export default CandidateAccepted
