import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import Skeleton from "react-loading-skeleton"
import { globalHistory } from "@reach/router"
import { UserContext } from "../../../context/UserContext"

import getCurrentBooking from "./actions/getCurrentBooking"
import putCancelBooking from "./actions/putCancelBooking"
import ProfessionalCard from "./booking/ProfessionalCard"
import {
  B1Sage,
  colors,
  H1DarkPurple,
  Nav1CharcoalGrey,
  H4DarkPurple,
  H2Lavender,
  Btn1DarkPurple,
} from "../../../styles/helpers"

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

  if (currentBooking !== null) {
    bookingStatusTitle =
      !currentBooking.booking_active && currentBooking.candidate_selected
        ? "FULFILLED"
        : !currentBooking.booking_active && !currentBooking.candidate_selected
        ? "UNFULFILLED"
        : currentBooking.booking_active && !currentBooking.candidate_selected
        ? "OPEN"
        : currentBooking.booking_active && currentBooking.candidate_selected
        ? "ERROR"
        : "ERROR"

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
                <div className="bookingactivity__button">
                  <button onClick={() => handleCancelBooking()}>
                    Request Cancellation
                  </button>
                </div>
              </div>
            )}
            <div className="bookingCandidates">
              {bookingStatusTitle === "OPEN" ? (
                <div>
                  <div>
                    <h3>Potential Candidates</h3>
                  </div>
                  {currentBooking.professionals_applied &&
                    currentBooking.professionals_applied.length > 0 && (
                      <div className="bookingCandidates__wrapper">
                        {currentBooking.professionals_applied.map(pro => (
                          <ProfessionalCard
                            key={pro.id}
                            pro={pro}
                            bookingId={currentBooking._id}
                            accepted={false}
                          />
                        ))}
                      </div>
                    )}
                </div>
              ) : bookingStatusTitle === "ERROR" ? (
                <div>
                  <h3>Error With Booking</h3>
                </div>
              ) : bookingStatusTitle === "FULFILLED" ? (
                <div>
                  <div>
                    <h3>Candidate Accepted</h3>
                  </div>
                  <div className="bookingCandidates__wrapper">
                    <ProfessionalCard
                      pro={currentBooking.professional_selected}
                      bookingId={null}
                      accepted={true}
                    />
                  </div>
                </div>
              ) : bookingStatusTitle === "UNFULFILLED" ? (
                <div>
                  <h3>Booking Unfulfilled</h3>
                  <p>This booking expired or was canclled and was not filled</p>
                </div>
              ) : (
                <div>
                  <h3>Error With Booking</h3>
                </div>
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

      &__unfulfilled {
        background-color: #ede04d;
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
