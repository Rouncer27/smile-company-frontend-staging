import React from "react"
import styled from "styled-components"
import {
  H4DarkPurple,
  colors,
  Nav1CharcoalGrey,
} from "../../../../styles/helpers"

const BookingUnfulfilled = () => {
  return (
    <BookingUnfulfilledStyled>
      <div className="title">
        <h3>Booking Unfulfilled</h3>
        <p className="statusAlert">
          <span>FULFILLED</span>
        </p>
        <p>This booking has expired and was not filled</p>
      </div>
    </BookingUnfulfilledStyled>
  )
}

const BookingUnfulfilledStyled = styled.div`
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
        background-color: ${colors.unfulfilled};
        color: ${colors.black} !important;
        text-align: center;

        &:hover {
          color: ${colors.black};
        }
      }
    }
  }
`

export default BookingUnfulfilled
