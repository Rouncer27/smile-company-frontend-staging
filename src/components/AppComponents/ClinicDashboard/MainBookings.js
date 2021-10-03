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

const MainBookings = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const { bookings } = profile
  const [validBookings, setValidBookings] = useState([])
  const userId = user.id
  // On page load get the user profile from server. //
  const getUpToDateProfile = async () => getProfile(token, userId, dispatch)
  useEffect(() => {
    getUpToDateProfile()
    getValidBookings()
  }, [])

  const getValidBookings = () => {
    setValidBookings(
      bookings
        .filter(book => {
          console.log("HEY TREVOR RIGHT HERE IS THE BOOKING IS EXPIRED: ", book)
          return !book.is_expired
        })
        .sort((a, b) => new Date(a.day) - new Date(b.day))
    )
  }

  console.log("HERE IS THE VALID BOOKINGS: ", validBookings)

  return (
    <MainBookingsStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {state.profile && state.profile.profile_satisfied && (
            <p>
              <span /> {state.profile && state.profile.clinic_name}
            </p>
          )}
          <h2>My Bookings</h2>
        </div>
        <div className="dashContent">
          <ul>
            {validBookings.length > 0 ? (
              validBookings.map(booking => {
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
                      <span>{booking.bookingClinic}</span> &#124;
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
              })
            ) : (
              <li>
                <span>You have no upcoming bookings to review</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </MainBookingsStyled>
  )
}

const MainBookingsStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
    max-width: 85rem;
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
        padding: 1rem;
        padding-left: 15rem;
        border: 0.1rem solid rgba(0, 0, 0, 0.15);
        box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem rgba(0, 0, 0, 0.25);

        a {
          ${Nav1CharcoalGrey};

          span {
            display: inline-block;
            padding: 0 2rem;
          }
        }

        span.bookingStatus {
          position: absolute;
          left: 0.5rem;
          top: 1rem;
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
      }
    }
  }
`

export default MainBookings
