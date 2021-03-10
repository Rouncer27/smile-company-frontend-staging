// NPM Packages
import React, { useContext, useEffect } from "react"
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

const MainBookings = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const { bookings } = profile
  const userId = user.id
  // On page load get the user profile from server. //
  const getUpToDateProfile = async () => getProfile(token, userId, dispatch)
  useEffect(() => {
    getUpToDateProfile()
  }, [])

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
            {bookings.map(booking => {
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

              const status =
                !booking.booking_active && booking.candidate_selected
                  ? "FULFILLED"
                  : !booking.booking_active && !booking.candidate_selected
                  ? "UNFULFILLED"
                  : booking.booking_active && !booking.candidate_selected
                  ? "OPEN"
                  : "ERROR"

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
                      Shift Start:{" "}
                      {`${startHour}:${startMinutes} ${startMeridiem}`}
                    </span>
                    &#124;{" "}
                    <span>
                      Shift End: {`${endHour}:${endMinutes} ${endMeridiem}`}
                    </span>{" "}
                    &#124; <span>Position: {booking.position}</span>
                  </Link>
                </li>
              )
            })}
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
        width: 100%;
        margin-bottom: 1rem;

        a {
          ${Nav1CharcoalGrey};

          span {
            display: inline-block;
            padding: 0 2rem;
          }
        }

        span.bookingStatus {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          color: ${colors.black} !important;
          text-align: center;

          &:hover {
            color: ${colors.black};
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
      }
    }
  }
`

export default MainBookings
