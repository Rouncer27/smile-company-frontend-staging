import React from "react"
import styled from "styled-components"
import {
  H4DarkPurple,
  colors,
  Nav1CharcoalGrey,
} from "../../../../styles/helpers"

const BookingError = () => {
  return (
    <BookingErrorStyled>
      <div className="title">
        <h3>Error With Booking</h3>
        <p className="statusAlert">
          <span>ERROR</span>
        </p>
        <p>
          There has been an error with this booking. Please contact Smile and
          Compnay for assistance.
        </p>
      </div>
    </BookingErrorStyled>
  )
}

const BookingErrorStyled = styled.div`
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
        background-color: ${colors.error};
        color: ${colors.black} !important;
        text-align: center;

        &:hover {
          color: ${colors.black};
        }
      }
    }
  }
`

export default BookingError
