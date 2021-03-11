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
import ApprovedItem from "./approved/ApprovedItem"
import LoadingSkeleton from "./UiComponents/LoadingSkeleton"

const MainApproved = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile, bookings } = state
  const userId = user.id

  const handleGetProfileOnMount = async () => {
    await getUserProfile(token, userId, state.user.confirmed, dispatch)
    await getBookings(token, userId, state.user.confirmed, dispatch)
  }

  useEffect(() => {
    handleGetProfileOnMount()
  }, [])

  const approvedBookings = bookings.filter(
    booking => booking.candidate_selected
  )

  const myApprovedBookings = approvedBookings.filter(
    booking => booking.aceepted_profile_id === profile.id
  )

  return (
    <MainApprovedStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p>
            <span /> {state.profile && state.profile.username}
          </p>
          <h2>My Approved Bookings</h2>
        </div>
        {!state.loading ? (
          <>
            {myApprovedBookings && myApprovedBookings.length > 0 ? (
              <div className="dashApproved">
                {myApprovedBookings.map(item => {
                  if (item.is_expired) return null
                  return <ApprovedItem key={item.id} item={item} />
                })}
              </div>
            ) : (
              <div className="dashNothing">
                <p>Sorry, you haven't been matched with any temp jobs yet.</p>
              </div>
            )}
          </>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </MainApprovedStyled>
  )
}

const MainApprovedStyled = styled.div`
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
`

export default MainApproved
