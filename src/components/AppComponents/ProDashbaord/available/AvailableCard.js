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
    dispatch({ type: "USER_LOADING" })
    try {
      const response = await axios.get(
        `${process.env.GATSBY_API_URL}/bookings/professionals-apply/${id}`,
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

  const bookingSelected = booking.candidate_selected

  console.log(bookingSelected)

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

        {!bookingSelected && havApplied ? (
          <div className="appliedPosting">
            <p>
              You have applied to this posting. We will let you know if you got
              this temp job.
            </p>
          </div>
        ) : !bookingSelected && !havApplied ? (
          <div className="bookingBtn">
            <p>Apply to this temp job</p>
            <button onClick={() => handleApplyForBooking(booking._id)}>
              Yes
            </button>
          </div>
        ) : (
          <div>
            <p>
              Contragulations! You have been selected for this temp job. Please
              watch your email for details.
            </p>
          </div>
        )}
      </div>
    </AvailableCardStyled>
  )
}

const AvailableCardStyled = styled.div`
  width: calc(50% - 2rem);
  margin: 5rem 1rem 0;
  padding: 2rem 2.5rem;
  border-radius: 2.5rem;
  background-color: rgba(173, 137, 166, 0.25);

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
`

export default AvailableCard
