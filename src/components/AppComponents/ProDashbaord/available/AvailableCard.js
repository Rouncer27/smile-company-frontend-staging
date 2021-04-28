import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import {
  B1CharcoalGrey,
  Nav1CharcoalGrey,
  colors,
  H4Lavender,
  Btn1DarkPurple,
  B2CharcoalGrey,
} from "../../../../styles/helpers"
import { timeFormat, getMothName } from "../../../../utils/helperFunc"
import { UserContext } from "../../../../context/UserContext"

import getBookings from "../actions/getBookings"
import getBookingApply from "../actions/getBookingApply"
import putBookingIgnore from "../actions/putBookingIgnore"
// helpers
import getReadablePosition from "../helper/getReadablePosition"
import getReadableLocation from "../helper/getReadableLocation"

const AvailableCard = ({ booking }) => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const userId = user.id

  const [currentBookingTime, setCurrentBookingTime] = useState({
    shiftStartHour: "",
    shiftStartMinutes: "",
    shiftStartMeridiem: "",
    shiftEndHour: "",
    shiftEndMinutes: "",
    shiftEndMeridiem: "",
  })

  useEffect(() => {
    const currentBookingStartTime = booking ? booking.shift_start : []
    const currentBookingEndTime = booking ? booking.shift_end : []
    const startTimes = timeFormat(currentBookingStartTime)
    const endTimes = timeFormat(currentBookingEndTime)

    setCurrentBookingTime({
      shiftStartHour: startTimes.hour,
      shiftStartMinutes: startTimes.minutes,
      shiftStartMeridiem: startTimes.meridiem,
      shiftEndHour: endTimes.hour,
      shiftEndMinutes: endTimes.minutes,
      shiftEndMeridiem: endTimes.meridiem,
    })
  }, [])

  const handleApplyForBooking = async () => {
    await getBookingApply(token, dispatch, booking.id)
    await getBookings(token, userId, state.user.confirmed, dispatch)
  }

  const handleIgnorePost = async () => {
    await putBookingIgnore(token, booking.id, dispatch)
    await getBookings(token, userId, state.user.confirmed, dispatch)
  }
  const havApplied = booking.user_applied
  const isCancelled = booking.was_cancelled
  const isActive = booking.booking_active
  const isSelected = booking.candidate_selected
  const isAccepted = booking.user_selected
  const isExpired = booking.is_expired

  const bookingStatus =
    isCancelled && isAccepted
      ? "APPROVED POSTING CANCELLED"
      : isCancelled
      ? "POSTING CANCELLED"
      : isActive && !isSelected && havApplied
      ? "PENDING"
      : isActive && !isSelected && !havApplied
      ? "OPEN"
      : !isActive && isSelected && !isAccepted
      ? "NOT SELECTED"
      : !isActive && isSelected && havApplied && isAccepted
      ? "APPROVED"
      : !isActive && !isSelected && isExpired
      ? "EXPIRED"
      : "ERROR"

  return (
    <AvailableCardStyled key={booking.id}>
      <div className="detailsTitle">
        <p>
          Clinic Name: <span>{booking.clinic_name}</span>
        </p>
        <p>
          Position: <span>{getReadablePosition(booking.position)}</span>
        </p>
        <p>
          Location: <span>{getReadableLocation(booking.location)}</span>
        </p>
        <p>
          Street Address / Parking Details: <span>{booking.address}</span>
        </p>
      </div>
      <div className="detailsShift">
        <h3>Shift Date and Time</h3>
        <p>
          Shift Date:{" "}
          <span className="detailsShift__shiftDay">
            {booking.booking_day_off_the_week.charAt(0).toUpperCase() +
              booking.booking_day_off_the_week.slice(1)}
            , {getMothName(booking.day)} {booking.day.split("-")[2]},{" "}
            {booking.day.split("-")[0]}
          </span>{" "}
          <span className="detailsShift__shiftTime">
            <span>
              Shift Start:{" "}
              {`${currentBookingTime.shiftStartHour}:${currentBookingTime.shiftStartMinutes} ${currentBookingTime.shiftStartMeridiem}`}
            </span>
            <span>
              Shift End:{" "}
              {`${currentBookingTime.shiftEndHour}:${currentBookingTime.shiftEndMinutes} ${currentBookingTime.shiftEndMeridiem}`}
            </span>
          </span>
        </p>

        {bookingStatus !== "APPROVED POSTING CANCELLED" ? (
          <div className="cancelWarn">
            <p>
              <span>&#42; NOTE.</span> If you are selected for this booking and
              need to cancel, there might be a $50.00 fee for cancelling.
            </p>
          </div>
        ) : (
          <div className="cancelWarn">
            <p>
              <span>&#42; JOB CANCELLED BY CLINIC</span> -- If you have any
              questions please call Smile and Co. at 403-899-2055
            </p>
          </div>
        )}

        {bookingStatus === "APPROVED POSTING CANCELLED" && (
          <div className="status status__concelled">
            <p className="status__indicator">
              Posting Status -- <span>POSTING CANCELLED</span>
            </p>
            <p>
              Sorry, you were selected for this temp job but the clinic has now
              cancelled this job posting.
            </p>
          </div>
        )}

        {bookingStatus === "PENDING" && (
          <div className="status status__pending">
            <p className="status__indicator">
              Posting Status -- <span>PENDING</span>
            </p>
            <p>
              You have applied to this posting. please wait for confirmation
              from the clinic.
            </p>
          </div>
        )}

        {bookingStatus === "OPEN" && (
          <div className="bookingBtn status status__open">
            <p className="status__indicator">
              Posting Status -- <span>OPEN</span>
            </p>
            <p>Apply to this temp job</p>
            <button onClick={() => handleApplyForBooking()}>Yes</button>
          </div>
        )}

        {bookingStatus === "NOT SELECTED" && (
          <div className="status status__notSelected">
            <p className="status__indicator">
              Posting Status -- <span>NOT SELECTED</span>
            </p>
            <p>sorry, you were not selected for this temp job.</p>
          </div>
        )}

        {bookingStatus === "APPROVED" && (
          <div className="status status__approved">
            <p className="status__indicator">
              Posting Status -- <span>APPROVED</span>
            </p>
            <p>
              Contragulations! You have been selected for this temp job. Please
              check Approved Bookings in your dashboard side navigation.
            </p>
          </div>
        )}

        {bookingStatus === "POSTING CANCELLED" && (
          <div className="status status__concelled">
            <p className="status__indicator">
              Posting Status -- <span>POSTING CANCELLED</span>
            </p>
            <p>Sorry, This temp job posting was cancelled.</p>
          </div>
        )}

        {bookingStatus === "EXPIRED" && (
          <div className="status status__expired">
            <p className="status__indicator">
              Posting Status -- <span>EXPIRED</span>
            </p>
            <p>Sorry, This temp job posting has expired.</p>
          </div>
        )}

        {bookingStatus === "ERROR" && (
          <div className="status status__error">
            <p className="status__indicator">
              Posting Status -- <span>ERROR</span>
            </p>
            <p>ERROR!</p>
          </div>
        )}

        <div className="ignorePost">
          <p>
            Click to remove this post forever from your available booking page.
          </p>
          <button onClick={() => handleIgnorePost()}>Remove this post</button>
        </div>
      </div>
    </AvailableCardStyled>
  )
}

const AvailableCardStyled = styled.div`
  width: calc(100%);
  margin: 5rem 0 0;
  padding: 2rem 2.5rem;
  border-radius: 2.5rem;
  background-color: rgba(173, 137, 166, 0.25);

  @media (min-width: 768px) {
    width: calc(50% - 2rem);
    margin: 5rem 1rem 0;
  }

  .detailsTitle {
    width: 100%;
    margin-bottom: 1rem;

    p {
      ${B1CharcoalGrey};
      margin: 0;

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

  .cancelWarn {
    p {
      span {
        color: ${colors.error};
      }
    }
  }

  .detailsShift {
    width: 100%;
    margin-bottom: 2rem;

    h3 {
      ${H4Lavender};
      margin: 0;
    }

    p {
      ${Nav1CharcoalGrey};
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }

      span.detailsShift__shiftTime {
        display: block;

        span {
          display: block;
        }
      }
    }
  }

  .appliedPosting {
    p {
      ${B2CharcoalGrey};
      margin-top: 2rem;
      margin-bottom: 0;
      color: ${colors.cancelled};
      font-weight: bold;
      line-height: 1.35;
    }
  }

  .bookingBtn {
    margin-top: 2.5rem;

    button {
      ${Btn1DarkPurple};
    }
  }

  .ignorePost {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 0.1rem solid ${colors.colorAlt};

    button {
      ${Btn1DarkPurple};
    }
  }

  .status {
    width: 100%;
    padding: 1.5rem 0;

    p {
      margin-bottom: 0;
    }

    &__indicator {
      span {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
      }
    }

    &__open {
      .status__indicator {
        span {
          background-color: ${colors.open};
        }
      }
    }

    &__pending {
      .status__indicator {
        span {
          background-color: ${colors.open};
        }
      }
    }

    &__approved {
      .status__indicator {
        span {
          background-color: ${colors.fulfilled};
        }
      }
    }

    &__expired {
      .status__indicator {
        span {
          background-color: ${colors.cancelled};
        }
      }
    }

    &__concelled {
      .status__indicator {
        span {
          background-color: ${colors.cancelled};
        }
      }
    }

    &__notSelected {
      .status__indicator {
        span {
          background-color: ${colors.shortcancelled};
        }
      }
    }
    &__error {
      .status__indicator {
        span {
          background-color: ${colors.error};
        }
      }
    }
  }
`

export default AvailableCard
