import React from "react"
import styled from "styled-components"
import {
  H4DarkPurple,
  colors,
  Nav1CharcoalGrey,
} from "../../../../styles/helpers"

const BookingCancelledShort = () => {
  return (
    <BookingCancelledShortStyled>
      <div className="title">
        <h3>This booking was cancelled with short notice</h3>
        <p className="statusAlert">
          <span>SHORTCANCELLED</span>
        </p>
        <p>
          This booking was cancelled with less than 24hrs notice and a $50 fee
          has been applied to your account.
        </p>
      </div>
    </BookingCancelledShortStyled>
  )
}

const BookingCancelledShortStyled = styled.div`
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
        background-color: ${colors.shortcancelled};
        color: ${colors.black} !important;
        text-align: center;

        &:hover {
          color: ${colors.black};
        }
      }
    }
  }
`

export default BookingCancelledShort
