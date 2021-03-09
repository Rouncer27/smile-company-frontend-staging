import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { B1Sage, colors, H1DarkPurple } from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"
import getUserProfile from "./actions/getUserProfile"
import getBookings from "./actions/getBookings"

import ApprovedItem from "./approved/ApprovedItem"

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
        {myApprovedBookings && myApprovedBookings.length > 0 ? (
          <div className="dashApproved">
            {myApprovedBookings.map(item => (
              <ApprovedItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="dashNothing">
            <p>Sorry, you haven't been matched with any temp jobs yet.</p>
          </div>
        )}
      </div>
    </MainApprovedStyled>
  )
}

const MainApprovedStyled = styled.div`
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

  .bookingsWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`

export default MainApproved
