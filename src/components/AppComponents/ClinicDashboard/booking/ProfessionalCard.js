import React, { useContext } from "react"
import styled from "styled-components"

import {
  H3CharcoalGrey,
  H4Lavender,
  B1CharcoalGrey,
  Nav1CharcoalGrey,
  colors,
  Btn1DarkPurple,
} from "../../../../styles/helpers"

import putAcceptCandidate from "../actions/putAcceptCandidate"
import getProfile from "../actions/getProfile"
import { UserContext } from "../../../../context/UserContext"
import positionDisplay from "../helper/getReadablePosition"

const ProfessionalCard = ({ pro, bookingId, accepted }) => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile, bookings } = state
  const userId = user.id

  const handleOnAccept = async () => {
    if (!accepted && bookingId !== null) {
      await putAcceptCandidate(token, userId, dispatch, bookingId, pro.id)
      await getProfile(token, userId, dispatch)
    }
  }

  const yearsDisplay =
    pro.experience === "oneYear"
      ? "Less than 1 year"
      : pro.experience === "twoFiveYear"
      ? "2 to 5 Years"
      : pro.experience === "sixNineYear"
      ? "6 to 9 Years"
      : pro.experience === "tenPlus"
      ? "10+"
      : "No Answer"

  return (
    <ProfessionalCardStyled>
      <div className="cardInner">
        <div className="cardTitle">
          <h3 id="title">
            <span>{pro.first_name}</span> <span>{pro.last_name}</span>
          </h3>
          <p>Position: {positionDisplay(pro.position)}</p>
          <p>Wage expectations: {pro.wage}</p>
        </div>
        <div className="cardExperience">
          <h4>Candidate's Experience</h4>
          <p>
            Years of experience: <span>{yearsDisplay}</span>
          </p>
          <p>
            Dental Sofeware experience: <span>{pro.dental_software}</span>
          </p>
          <p>
            Additional Qualifications:{" "}
            <span>{pro.additional_qualifications}</span>
          </p>
        </div>
        <div className="cardEducation">
          <h4>Candidate's Education</h4>
          <p>
            School Graduated From: <span>{pro.school}</span>
          </p>
          <p>
            Year Graduated From Program: <span>{pro.year_graduated}</span>
          </p>
        </div>
        {!accepted && (
          <div className="btnActions">
            <button onClick={handleOnAccept}>Accept Candidate</button>
          </div>
        )}
      </div>
    </ProfessionalCardStyled>
  )
}

const ProfessionalCardStyled = styled.div`
  width: calc(100%);
  margin: 1rem 0;
  padding: 2rem 2.5rem;
  border-radius: 2.5rem;
  background-color: rgba(173, 137, 166, 0.25);

  .cardTitle {
    h3 {
      span {
        ${H3CharcoalGrey};
      }
    }

    p {
      ${Nav1CharcoalGrey};
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
    }
  }

  .cardExperience {
    h4 {
      ${H4Lavender};
    }

    p {
      ${B1CharcoalGrey};
      margin-bottom: 1.5rem;

      span {
        ${Nav1CharcoalGrey};
        margin-bottom: 1.5rem;

        &:hover {
          color: ${colors.colorAlt};
          cursor: inherit;
        }
      }
    }
  }

  .cardEducation {
    h4 {
      ${H4Lavender};
    }

    p {
      ${B1CharcoalGrey};
      margin-bottom: 1.5rem;

      span {
        ${Nav1CharcoalGrey};
        margin-bottom: 1.5rem;

        &:hover {
          color: ${colors.colorAlt};
          cursor: inherit;
        }
      }
    }
  }

  .btnActions {
    margin-top: 3rem;
    margin-bottom: 3rem;

    button {
      ${Btn1DarkPurple};
    }
  }
`

export default ProfessionalCard
