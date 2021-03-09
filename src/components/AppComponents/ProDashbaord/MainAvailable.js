import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { B1Sage, colors, H1DarkPurple } from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"
import getUserProfile from "./actions/getUserProfile"
import getBookings from "./actions/getBookings"

import AvailableCard from "./available/AvailableCard"
import dashWrap from "./style/dashWrap"

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
        <div>
          {bookings && bookings.length > 0 ? (
            <div className="bookingsWrapper">
              {bookings.map(booking => {
                console.log(booking.isIgnored)
                if (booking.isIgnored) return null

                return <AvailableCard key={booking.id} booking={booking} />
              })}
            </div>
          ) : (
            <div>
              <h2>
                There is currenly no bookings you are matched for. Please check
                again later.
              </h2>
            </div>
          )}
        </div>
      </div>
    </MainAvailableStyled>
  )
}

const MainAvailableStyled = styled.div`
  align-self: stretch;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    width: calc(70vw);
  }

  .dashWrap {
    ${dashWrap};
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

  .bookingsWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`

export default MainAvailable
