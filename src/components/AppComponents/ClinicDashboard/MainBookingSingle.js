// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import { globalHistory } from "@reach/router"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getCurrentBooking from "./actions/getCurrentBooking"
import putCancelBooking from "./actions/putCancelBooking"
// Common styles
import mainSection from "./styles/mainSection"
import dashWrap from "./styles/dashWrap"
import dashTitle from "./styles/dashTitle"
import {
  colors,
  Nav1CharcoalGrey,
  H4DarkPurple,
  H2Lavender,
  Btn1DarkPurple,
} from "../../../styles/helpers"
// Components
import PotentalCandidates from "./booking/PotentalCandidates"
import BookingError from "./booking/BookingError"
import CandidateAccepted from "./booking/CandidateAccepted"
import BookingUnfulfilled from "./booking/BookingUnfulfilled"
import BookingCancelled from "./booking/BookingCancelled"
import BookingCancelledShort from "./booking/BookingCancelledShort"
// Helper Functions
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

  const getBookingFromServer = async () => {
    const currentBooking = await getCurrentBooking(
      token,
      userId,
      dispatch,
      currentBookingId
    )
    setCurrentBooking(currentBooking)
  }

  useEffect(() => {
    if (currentBookingId) getBookingFromServer()
  }, [currentBookingId, profile])

  useEffect(() => {
    const urlSplit = globalHistory.location.pathname.split("/")
    const bookingId = urlSplit[urlSplit.length - 1]
    setCurrentBookingId(bookingId)
  }, [])

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

  let bookingStatusTitle
  let bookingStatus
  let isActive
  let is_short_notice = false

  if (currentBooking !== null) {
    const is_active = currentBooking.booking_active
    const is_selected = currentBooking.candidate_selected
    const is_expired = currentBooking.is_expired
    const is_cancelled = currentBooking.was_cancelled
    const is_cancelled_short = currentBooking.was_cancelled_with_short_notice

    bookingStatusTitle =
      // Booking Was Cancelled with short notice.
      is_cancelled && is_cancelled_short
        ? "SHORTCANCELLED"
        : // Booking Was Cancelled with proper notice.
        is_cancelled
        ? "CANCELLED"
        : // A Candidate was selected.
        is_selected
        ? "FULFILLED"
        : // This Post is active and has not expired yet and still needs to select a candiate
        is_active && !is_expired && !is_selected
        ? "OPEN"
        : // This Post is expired and has not selected a candiate
        is_expired && !is_selected
        ? "UNFULFILLED"
        : "ERROR"

    is_short_notice = currentBooking.is_short_notice

    bookingStatus =
      !currentBooking.booking_active && currentBooking.candidate_selected
        ? "closed and a candidate has been selected and posting if filled."
        : !currentBooking.booking_active && !currentBooking.candidate_selected
        ? "closed and no candidates have been selected, this post has not been filled."
        : currentBooking.booking_active && !currentBooking.candidate_selected
        ? "open and waiting for replies from protental candidates."
        : "There has been an error. If required please contact Smile and Company for assitance."

    isActive =
      !currentBooking.booking_active && currentBooking.candidate_selected
        ? false
        : !currentBooking.booking_active && !currentBooking.candidate_selected
        ? false
        : currentBooking.booking_active && !currentBooking.candidate_selected
        ? true
        : false
  }

  const handleCancelBooking = async () => {
    await putCancelBooking(token, dispatch, profile, currentBooking)
    await getBookingFromServer()
  }

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
            <div className="bookingStatus">
              <h3>Booking Status</h3>
              <p>
                Booking Active:{" "}
                <span
                  className={`bookingStatus__indicator bookingStatus__${bookingStatusTitle.toLowerCase()}`}
                >
                  {bookingStatusTitle}
                </span>
              </p>
              <p>This temp booking is now --- {bookingStatus}</p>
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
            {isActive && (
              <div className="bookingActivity">
                <h3>Cancel Booking</h3>
                {is_short_notice && (
                  <p>
                    <span className="shortNotice">
                      Request Short Notice Cancellation - $50.00 Fee
                    </span>
                  </p>
                )}
                <div className="bookingactivity__button">
                  <button onClick={() => handleCancelBooking()}>
                    {is_short_notice
                      ? "Request Short Notice Cancellation"
                      : "Request Cancellation"}
                  </button>
                </div>
              </div>
            )}
            <div className="bookingCandidates">
              {bookingStatusTitle === "OPEN" ? (
                <PotentalCandidates currentBooking={currentBooking} />
              ) : bookingStatusTitle === "ERROR" ? (
                <BookingError />
              ) : bookingStatusTitle === "FULFILLED" ? (
                <CandidateAccepted
                  proSelected={currentBooking.professional_selected}
                />
              ) : bookingStatusTitle === "UNFULFILLED" ? (
                <BookingUnfulfilled />
              ) : bookingStatusTitle === "CANCELLED" ? (
                <BookingCancelled />
              ) : bookingStatusTitle === "SHORTCANCELLED" ? (
                <BookingCancelledShort />
              ) : (
                <BookingError />
              )}
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
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }

  .dashTitle {
    ${dashTitle};
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

    .bookingStatus {
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
      &__indicator {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        color: ${colors.black} !important;
        text-align: center;

        &:hover {
          color: ${colors.black};
        }
      }

      &__open {
        background-color: #4bb1cf;
      }

      &__fulfilled {
        background-color: #15cd72;
      }

      &__unfulfilled,
      &__cancelled {
        background-color: #ede04d;
      }

      &__shortcancelled {
        background-color: #ed4f32;
      }

      &__error {
        background-color: #ed4f32;
      }
    }

    .bookingDates,
    .bookingPosition,
    .bookingActivity,
    .bookingLocation {
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

      .shortNotice {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        background-color: #ed4f32;
        color: ${colors.black} !important;
        text-align: center;

        &:hover {
          color: ${colors.black};
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

  .bookingCandidates {
    margin-bottom: 2rem;
    &__titles {
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
    &__wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
`

export default MainBookingSingle
