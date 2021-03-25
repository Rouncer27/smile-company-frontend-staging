import React from "react"
import styled from "styled-components"
import {
  H4DarkPurple,
  colors,
  Nav1CharcoalGrey,
} from "../../../../styles/helpers"

const BookingCancelled = () => {
  return (
    <BookingCancelledStyled>
      <div className="title">
        <h3>This Booking Was Cancelled</h3>
        <p className="statusAlert">
          <span>CANCELLED</span>
        </p>
        <p>This booking was cancelled.</p>
      </div>
    </BookingCancelledStyled>
  )
}

const BookingCancelledStyled = styled.div`
  .title {
    h3 {
      ${H4DarkPurple};
    }

    p {
      ${Nav1CharcoalGrey};
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
    }

    .statusAlert {
      span {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        background-color: ${colors.cancelled};
        color: ${colors.black} !important;
        text-align: center;

        &:hover {
          color: ${colors.black};
        }
      }
    }
  }
`

export default BookingCancelled
