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

const AvailableCard = ({ booking }) => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile, bookings } = state
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

  const handleApplyForBooking = async id => {
    await getBookingApply(token, dispatch, id)
    await getBookings(token, userId, state.user.confirmed, dispatch)
  }

  const handleIgnorePost = async id => {
    dispatch({ type: "USER_LOADING" })
    try {
      const response = await axios.put(
        `${process.env.GATSBY_API_URL}/bookings/ignore/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      dispatch({
        type: "USER_ALERT",
        payload: {
          message: response.data.message,
        },
      })

      await getBookings(token, userId, state.user.confirmed, dispatch)
    } catch (err) {
      console.dir(err)
      const message =
        err.response.data &&
        err.response.data.message &&
        typeof err.response.data.message === "object"
          ? err.response.data.message[0] &&
            err.response.data.message[0].messages[0] &&
            err.response.data.message[0].messages[0].message
          : typeof err.response.data.message === "string"
          ? err.response.data.message
          : "Something went wrong. Please try again later"
      dispatch({ type: "USER_ERROR", payload: { message } })
    }
  }

  const havApplied =
    booking.applied_ids.findIndex(id => id === profile.id) !== -1 ? true : false
  const isActive = booking.booking_active
  const isSelected = booking.candidate_selected
  const acceptedId = booking.aceepted_profile_id
  const myId = profile.id
  const isAccepted = acceptedId === myId

  const bookingStatus =
    isActive && !isSelected && havApplied
      ? "PENDING"
      : isActive && !isSelected && !havApplied
      ? "OPEN"
      : !isActive && isSelected && !isAccepted
      ? "NOT SELECTED"
      : !isActive && isSelected && havApplied && isAccepted
      ? "APPROVED"
      : !isActive && !isSelected
      ? "POSTING CANCELLED"
      : "ERROR"

  return (
    <AvailableCardStyled key={booking.id}>
      <div className="detailsTitle">
        <p>
          Clinic Name: <span>{booking.clinic_name}</span>
        </p>
        <p>
          Position: <span>{booking.position}</span>
        </p>
        <p>
          Location: <span>{booking.location}</span>
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

        {bookingStatus === "PENDING" && (
          <div className="status status__pending">
            <p className="status__indicator">
              Posting Status -- <span>PENDING</span>
            </p>
            <p>
              You have applied to this posting. We will let you know if you got
              this temp job.
            </p>
          </div>
        )}

        {bookingStatus === "OPEN" && (
          <div className="bookingBtn status status__open">
            <p className="status__indicator">
              Posting Status -- <span>OPEN</span>
            </p>
            <p>Apply to this temp job</p>
            <button onClick={() => handleApplyForBooking(booking._id)}>
              Yes
            </button>
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
          <button onClick={() => handleIgnorePost(booking.id)}>
            Remove this post
          </button>
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
      color: rgba(255, 0, 0, 1);
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
    padding: 1.5rem;

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
          background-color: #4bb1cf;
        }
      }
    }

    &__pending {
      .status__indicator {
        span {
          background-color: #4bb1cf;
        }
      }
    }

    &__approved {
      .status__indicator {
        span {
          background-color: #15cd72;
        }
      }
    }

    &__concelled {
      .status__indicator {
        span {
          background-color: #ede04d;
        }
      }
    }

    &__notSelected {
      .status__indicator {
        span {
          background-color: #ff7200;
        }
      }
    }
    &__error {
      .status__indicator {
        span {
          background-color: #ed4f32;
        }
      }
    }
  }
`

export default AvailableCard
