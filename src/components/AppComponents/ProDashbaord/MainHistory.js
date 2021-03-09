// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getUserProfile from "./actions/getUserProfile"
import getBookings from "./actions/getBookings"
// Common styles
import mainSection from "./style/mainSection"
import dashWrap from "./style/dashWrap"
import dashTitle from "./style/dashTitle"
import dashAlert from "./style/dashAlert"
import { colors, Nav1CharcoalGrey } from "../../../styles/helpers"
// Components
import LoadingSkeleton from "./UiComponents/LoadingSkeleton"

const MainHistory = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile, bookings } = state
  const userId = user.id
  const [pastBookings, setPastBookings] = useState([])

  const handleGetProfileOnMount = async () => {
    await getUserProfile(token, userId, state.user.confirmed, dispatch)
    await getBookings(token, userId, state.user.confirmed, dispatch)
    getPastBooking()
  }

  useEffect(() => {
    handleGetProfileOnMount()
  }, [])

  const getPastBooking = () => {
    const pastBooking = bookings.filter(booking => {
      if (booking.aceepted_profile_id !== profile.id) return false
      const dateObj = new Date()
      const month = String(dateObj.getMonth())
      const day = String(dateObj.getDate())
      const year = dateObj.getFullYear()
      // Check the years
      const bookYear = parseInt(booking.day.split("-")[0])
      const yearHistory = year > bookYear
      if (yearHistory) return true

      // Check the month
      const bookMonth = parseInt(booking.day.split("-")[1])
      const monthHistory = month > bookMonth
      if (monthHistory) return true

      // Check the Day
      const bookDay = parseInt(booking.day.split("-")[2])
      const dayHistory = day > bookDay
      if (dayHistory) return true

      return false
    })
    setPastBookings(pastBooking)
  }

  return (
    <MainHistoryStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {state.user && state.user.username && (
            <p>
              <span /> {state.user.username}
            </p>
          )}
          <h2>Past Bookings</h2>
        </div>
        {!state.loading ? (
          <div>
            {pastBookings.length === 0 ? (
              <div className="dashAlert">
                <span className="alertIndicator">Alert</span>
                <p>There are no past bookings</p>
              </div>
            ) : (
              <div className="pastBookingItems">
                {pastBookings.map(booking => {
                  return (
                    <div className="pastItem">
                      <p>
                        <span>{booking.clinic_name}</span> &#124;{" "}
                        <span>{booking.location}</span> &#124;{" "}
                        <span>{booking.day}</span> &#124;{" "}
                        <span>{booking.position}</span>
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </MainHistoryStyled>
  )
}

const MainHistoryStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }

  .dashTitle {
    ${dashTitle};
  }

  .dashAlert {
    ${dashAlert};
  }

  .pastItem {
    p {
      ${Nav1CharcoalGrey};
      margin-top: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }

      span {
        display: inline-block;
        padding: 0 2rem;
      }
    }
  }
`

export default MainHistory
