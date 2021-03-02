import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import {
  B1Sage,
  colors,
  H1DarkPurple,
  Nav1CharcoalGrey,
} from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"
import { Link } from "gatsby"
import { timeFormat, getMothName } from "../../../utils/helperFunc"

const MainBookings = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const { bookings } = profile
  const userId = user.id

  const getUpToDateProfile = async () => {
    dispatch({ type: "USER_LOADING" })

    try {
      const response = await axios.get(
        `${process.env.GATSBY_API_URL}/clinic-profiles/my-profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({
        type: "USER_GET_PROFILE",
        payload: { profile: response.data },
      })
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

              return (
                <li key={booking.id}>
                  <Link to={`/app/clinic-dashboard/bookings/${booking.id}`}>
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

          span:first-of-type {
            padding-left: 0;
          }
        }
      }
    }
  }
`

export default MainBookings
