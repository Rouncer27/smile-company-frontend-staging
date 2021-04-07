// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getProfile from "./actions/getProfile"
// Common styles
import mainSection from "./styles/mainSection"
import dashWrap from "./styles/dashWrap"
import dashTitle from "./styles/dashTitle"
import { colors, Nav1CharcoalGrey } from "../../../styles/helpers"
// Helper Functions
import { timeFormat, getMothName } from "../../../utils/helperFunc"
import getBookingStatus from "./helper/getBookingStatus"
import getReadablePosition from "./helper/getReadablePosition"

const MainBookingsHistory = () => {
  const [state, dispatch] = useContext(UserContext)
  const [expiredBookings, setExpiredBookings] = useState([])
  const { token, user, profile } = state
  const { bookings } = profile
  const userId = user.id

  // On page load get the user profile from server. //
  const getUpToDateProfile = async () =>
    await getProfile(token, userId, dispatch)

  useEffect(() => {
    getUpToDateProfile()
    getExpiredBookings()
  }, [])

  const getExpiredBookings = () => {
    setExpiredBookings(
      bookings
        .filter(book => book.is_expired)
        .sort((a, b) => new Date(b.day) - new Date(a.day))
    )
  }

  return (
    <MainBookingsHistoryStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {state.profile && state.profile.profile_satisfied && (
            <p>
              <span /> {state.profile && state.profile.clinic_name}
            </p>
          )}
          <h2>Booking Request History</h2>
        </div>
        <div className="dashContent">
          <ul>
            {expiredBookings.map(booking => {
              const positionDisplay = getReadablePosition(booking.position)
              const year = booking.day.split("-")[0]
              const monthName = getMothName(booking.day)
              const dayNumber = booking.day.split("-")[2]

              const dayOfTheWeek =
                booking.booking_day_off_the_week.charAt(0).toUpperCase() +
                booking.booking_day_off_the_week.slice(1)

              const {
                hour: startHour,
                minutes: startMinutes,
                meridiem: startMeridiem,
              } = timeFormat(booking.shift_start)

              const {
                hour: endHour,
                minutes: endMinutes,
                meridiem: endMeridiem,
              } = timeFormat(booking.shift_end)

              const statusInfo = getBookingStatus(booking)
              const status = statusInfo.bookingStatusTitle

              return (
                <li key={booking.id}>
                  <Link to={`/app/clinic-dashboard/bookings/${booking.id}`}>
                    <span
                      className={`bookingStatus bookingStatus__${status.toLowerCase()}`}
                    >
                      {status}
                    </span>
                    <span>
                      {dayOfTheWeek}, {monthName} {`${dayNumber}`}, {year}
                    </span>{" "}
                    &#124;{" "}
                    <span>
                      Shift: {`${startHour}:${startMinutes} ${startMeridiem}`}{" "}
                      to {`${endHour}:${endMinutes} ${endMeridiem}`}
                    </span>
                    &#124; <span>{positionDisplay}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </MainBookingsHistoryStyled>
  )
}

const MainBookingsHistoryStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
    max-width: 80rem;
  }

  .dashTitle {
    ${dashTitle};
  }

  .dashContent {
    width: 100%;
    margin: 5rem auto;

    ul {
      width: 100%;

      li {
        position: relative;
        width: 100%;
        margin-bottom: 2rem;
        padding-left: 15rem;

        a {
          ${Nav1CharcoalGrey};

          span {
            display: inline-block;
            padding: 0 2rem;
          }
        }

        span.bookingStatus {
          position: absolute;
          left: 0;
          top: 0.25rem;
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          color: ${colors.black} !important;
          text-align: center;

          &:hover {
            color: ${colors.black};
          }

          &__open {
            background-color: ${colors.open};
          }

          &__fulfilled {
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
      }
    }
  }
`

export default MainBookingsHistory
