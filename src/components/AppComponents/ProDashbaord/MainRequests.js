// NPM Packages
import React, { useContext, useEffect, useState } from "react"
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
// Components
import AvailableCard from "./available/AvailableCard"
import LoadingSkeleton from "./UiComponents/LoadingSkeleton"

const MainAvailable = () => {
  const [state, dispatch] = useContext(UserContext)
  const [bookingsNotIgnored, setBookingNotIgnored] = useState([])
  const { token, user, bookings } = state
  const userId = user.id

  console.log("HERE ARE THE BOOKINGS: ", state)

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

  useEffect(() => {
    setBookingNotIgnored(bookings.filter(book => !book.isIgnored))
  }, [bookings])

  return (
    <MainAvailableStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p>
            <span /> {state.profile && state.profile.username}
          </p>
          <h2>Booking Requests</h2>
        </div>
        {!state.loading ? (
          <div>
            {bookingsNotIgnored.length > 0 ? (
              <div className="bookingsWrapper">
                {bookingsNotIgnored.map(booking => (
                  <AvailableCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="dashAlert">
                <span className="alertIndicator">Alert</span>
                <p>
                  There is currenly no bookings requests you are matched for.
                  Please check again later.
                </p>
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

  .dashAlert {
    ${dashAlert};
  }
`

export default MainAvailable
