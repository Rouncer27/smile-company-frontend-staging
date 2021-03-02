import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { globalHistory } from "@reach/router"
import {
  B1Sage,
  colors,
  H1DarkPurple,
  Nav1CharcoalGrey,
  H4DarkPurple,
  H2Lavender,
  Btn1DarkPurple,
} from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"
import Skeleton from "react-loading-skeleton"
import { timeFormat, getMothName } from "../../../utils/helperFunc"

const MainBookingSingle = () => {
  const [currentBookingId, setCurrentBookingId] = useState("")
  const [currentBooking, setCurrentBooking] = useState(null)
  const [currentBookingTime, setCurrentBookingTime] = useState({
    shiftStartHour: "",
    shiftStartMinutes: "",
    shiftStartMeridiem: "",
    shiftEndHour: "",
    shiftEndMinutes: "",
    shiftEndMeridiem: "",
  })
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const userId = user.id

  useEffect(() => {
    const urlSplit = globalHistory.location.pathname.split("/")
    const bookingId = urlSplit[urlSplit.length - 1]
    setCurrentBookingId(bookingId)
  }, [])

  useEffect(() => {
    const booking = profile.bookings.find(
      booking => booking.id === currentBookingId
    )
    setCurrentBooking(booking)
  }, [currentBookingId])

  useEffect(() => {
    const currentBookingStartTime = currentBooking
      ? currentBooking.shift_start
      : []
    const currentBookingEndTime = currentBooking ? currentBooking.shift_end : []
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
  }, [currentBooking])

  return (
    <MainBookingSingleStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {" "}
          {state.profile && state.profile.profile_satisfied && (
            <p>
              <span /> {state.profile && state.profile.clinic_name}
            </p>
          )}
          <h2>Booking Detail</h2>
        </div>
        {currentBooking ? (
          <div className="dashContent">
            <div className="bookingTitle">
              <h2>Booking id #{currentBooking._id}</h2>
            </div>
            <div className="bookingDates">
              <h3>Booking Day and Time</h3>
              <p>
                Shift Date:{" "}
                {currentBooking.booking_day_off_the_week
                  .charAt(0)
                  .toUpperCase() +
                  currentBooking.booking_day_off_the_week.slice(1)}
                , {getMothName(currentBooking.day)}{" "}
                {currentBooking.day.split("-")[2]},{" "}
                {currentBooking.day.split("-")[0]}
              </p>
              <p>
                Shift Start:{" "}
                {`${currentBookingTime.shiftStartHour}:${currentBookingTime.shiftStartMinutes} ${currentBookingTime.shiftStartMeridiem}`}
              </p>
              <p>
                Shift End:{" "}
                {`${currentBookingTime.shiftEndHour}:${currentBookingTime.shiftEndMinutes} ${currentBookingTime.shiftEndMeridiem}`}
              </p>
            </div>
            <div className="bookingPosition">
              <h3>Booking Position</h3>
              <p>Position Reqested: {currentBooking.position}</p>
            </div>
            <div className="bookingLocation">
              <h3>Booking Location</h3>
              <p>Location Reqested: {currentBooking.location}</p>
              <p>Location Address: {currentBooking.address}</p>
            </div>
            <div className="bookingActivity">
              <h3>Booking Status</h3>
              <p>
                Booking Active:{" "}
                {currentBooking.booking_active ? "ACTIVE" : "FULFILLED"}
              </p>
              <div className="bookingactivity__button">
                <button>Request Cancellation</button>
              </div>
            </div>
            <div className="bookingCandidates">
              <h3>Booking Status</h3>
              <p>Potential Candidates: </p>
            </div>
          </div>
        ) : (
          <Skeleton count={10} />
        )}
      </div>
    </MainBookingSingleStyled>
  )
}

const MainBookingSingleStyled = styled.div`
  align-self: stretch;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    width: calc(70vw);
  }

  .dashWrap {
    width: calc(100% - 5rem);
    max-width: 80rem;
    margin-left: 5rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .dashTitle {
    width: 100%;

    h2 {
      ${H1DarkPurple};
      margin-top: 0;
    }

    p {
      ${B1Sage};
      margin-bottom: 0;
      font-weight: bold;
    }
  }
  .dashContent {
    width: 100%;
    margin: 5rem auto;

    .bookingTitle {
      margin-bottom: 5rem;
      h2 {
        ${H2Lavender};
      }
    }

    .bookingDates,
    .bookingPosition,
    .bookingActivity,
    .bookingLocation,
    .bookingCandidates {
      margin-bottom: 2rem;

      h3 {
        ${H4DarkPurple};
        margin: 0;
        margin-bottom: 1rem;
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

    .bookingactivity__button {
      margin: 1.5rem 0;
      button {
        ${Btn1DarkPurple};
      }
    }
  }
`

export default MainBookingSingle
