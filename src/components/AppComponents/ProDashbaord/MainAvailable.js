// NPM Packages
import React, { useContext, useEffect } from "react"
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
// Components
import AvailableCard from "./available/AvailableCard"
import LoadingSkeleton from "./UiComponents/LoadingSkeleton"
import { H4DarkPurple } from "../../../styles/helpers"

const MainAvailable = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, bookings } = state
  const userId = user.id

  const handleGetProfileOnMount = async () => {
    await getUserProfile(token, userId, state.user.confirmed, dispatch)
  }

  const handleGetBookings = async () => {
    await getBookings(token, userId, state.user.confirmed, dispatch)
  }

  useEffect(() => {
    handleGetProfileOnMount()
    handleGetBookings()
  }, [])

  return (
    <MainAvailableStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p>
            <span /> {state.profile && state.profile.username}
          </p>
          <h2>Available Bookings</h2>
        </div>
        {!state.loading ? (
          <div>
            {bookings && bookings.length > 0 ? (
              <div className="bookingsWrapper">
                {bookings.map(booking => {
                  if (booking.isIgnored) return null
                  return <AvailableCard key={booking.id} booking={booking} />
                })}
              </div>
            ) : (
              <div className="noBookings">
                <h3>
                  There is currenly no bookings you are matched for. Please
                  check again later.
                </h3>
              </div>
            )}
          </div>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </MainAvailableStyled>
  )
}

const MainAvailableStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }

  .dashTitle {
    ${dashTitle};
  }

  .bookingsWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .noBookings {
    h3 {
      ${H4DarkPurple};
    }
  }
`

export default MainAvailable
