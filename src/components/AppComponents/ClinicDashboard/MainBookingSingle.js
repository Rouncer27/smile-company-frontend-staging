// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import { globalHistory } from "@reach/router"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getProfile from "./actions/getProfile"
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
import getBookingStatus from "./helper/getBookingStatus"
import getReadablePosition from "./helper/getReadablePosition"
import ModalFee from "../../UiElements/ModalFee"
import getReadableLocation from "./helper/getReadableLocation"

const MainBookingSingle = () => {
  const [feeModalActive, setFeeModalActive] = useState(false)
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
  const { user, profile, token } = state
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

  // On page load get the user profile from server. //
  const getUpToDateProfile = async () => {
    await getProfile(token, userId, dispatch)
  }

  useEffect(() => {
    const urlSplit = globalHistory.location.pathname.split("/")
    const bookingId = urlSplit[urlSplit.length - 1]
    setCurrentBookingId(bookingId)
    getUpToDateProfile()
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
  let candidate_selected
  let is_expired = false
  let is_short_notice = false
  let isCancelled = false
  let postionDisplay
  let locationDisplay

  if (currentBooking !== null) {
    const statusInfo = getBookingStatus(currentBooking)
    bookingStatusTitle = statusInfo.bookingStatusTitle
    is_short_notice = statusInfo.isShortNotice
    candidate_selected = statusInfo.isCandidateSelected
    bookingStatus = statusInfo.bookingStatus
    isActive = statusInfo.isActive
    isCancelled = statusInfo.isCancelled
    is_expired = statusInfo.isExpired
    postionDisplay = getReadablePosition(currentBooking.position)
    locationDisplay = getReadableLocation(currentBooking.location)
  }

  const handleShortCancelBooking = async () => {
    setFeeModalActive(true)
  }

  const handleCancelBooking = async () => {
    await putCancelBooking(token, dispatch, profile, currentBooking)
    await getBookingFromServer()
    await getProfile(userId, dispatch)
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
          <h2>Booking Request Details</h2>
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
              <p>Position Reqested: {postionDisplay}</p>
            </div>
            <div className="bookingLocation">
              <h3>Booking Location</h3>
              <p>Location Reqested: {locationDisplay}</p>
              <p>Location Clinic Name: {currentBooking.bookingClinic}</p>
              <p>Location Address: {currentBooking.address}</p>
            </div>
            {!isCancelled && !is_expired && (
              <div className="bookingActivity">
                <h3>Cancel Booking</h3>
                {is_short_notice && candidate_selected && (
                  <p>
                    <span className="shortNotice">
                      Request Short Notice Cancellation - $50.00 Fee
                    </span>
                  </p>
                )}
                <div className="bookingactivity__button">
                  {is_short_notice && candidate_selected ? (
                    <button onClick={() => handleShortCancelBooking()}>
                      Request Short Notice Cancellation
                    </button>
                  ) : (
                    <button onClick={() => handleCancelBooking()}>
                      Request Cancellation
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="bookingCandidates">
              {bookingStatusTitle === "OPEN" ? (
                <PotentalCandidates
                  proApplied={
                    currentBooking.professionals_applied
                      ? currentBooking.professionals_applied
                      : []
                  }
                  bookingID={currentBooking._id}
                />
              ) : bookingStatusTitle === "ERROR" ? (
                <BookingError />
              ) : bookingStatusTitle === "CONFIRMED" ? (
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
      {is_short_notice && (
        <ModalFee
          active={feeModalActive}
          setFeeModalActive={setFeeModalActive}
          handleShortCancelBooking={handleCancelBooking}
        />
      )}
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
        background-color: ${colors.open};
      }

      &__fulfilled,
      &__confirmed {
        background-color: ${colors.fulfilled};
      }

      &__unfulfilled {
        background-color: ${colors.unfulfilled};
      }

      &__cancelled {
        background-color: ${colors.cancelled};
      }

      &__shortcancelled {
        background-color: ${colors.shortcancelled};
      }

      &__error {
        background-color: #${colors.error};
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
