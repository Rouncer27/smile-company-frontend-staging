import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  H4DarkPurple,
  Nav1CharcoalGrey,
  colors,
} from "../../../../styles/helpers"
import ProfessionalCard from "./ProfessionalCard"

const PotentalCandidates = currentBooking => {
  const [hasCandidates, setHasCandidates] = useState(false)

  useEffect(() => {
    if (
      currentBooking.professionals_applied &&
      currentBooking.professionals_applied.length > 0
    ) {
      setHasCandidates(true)
    } else {
      setHasCandidates(false)
    }
  }, [])

  return (
    <PotentalCandidatesStyled>
      <div className="title">
        <h3>Potential Candidates</h3>
        <p className="statusAlert">
          <span>OPEN</span>
        </p>
      </div>
      {hasCandidates ? (
        <div className="bookingCandidates__wrapper">
          {currentBooking.professionals_applied.map(pro => (
            <ProfessionalCard
              key={pro.id}
              pro={pro}
              bookingId={currentBooking._id}
              accepted={false}
            />
          ))}
        </div>
      ) : (
        <div className="noCandidates">
          <p>
            There is currently no candidates that have applied to this posting.
            Please check back again soon!
          </p>
        </div>
      )}
    </PotentalCandidatesStyled>
  )
}

const PotentalCandidatesStyled = styled.div`
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
        background-color: #4bb1cf;
        color: ${colors.black} !important;
        text-align: center;

        &:hover {
          color: ${colors.black};
        }
      }
    }
  }

  .noCandidates {
    p {
      ${Nav1CharcoalGrey};
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
    }
  }
`

export default PotentalCandidates
