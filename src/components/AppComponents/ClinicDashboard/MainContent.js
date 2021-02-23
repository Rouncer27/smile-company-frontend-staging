import { navigate } from "gatsby"
import React, { useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import { UserContext } from "../../../context/UserContext"

import {
  B1CharcoalGrey,
  Btn1DarkPurple,
  colors,
  H1DarkPurple,
} from "../../../styles/helpers"

const MainDashboard = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user } = state
  const { confirmed, email } = user

  console.log("MAIN DASHBOARD: ", state)
  console.log("MAIN token: ", token)

  const handleConfirmedEmail = async () => {
    dispatch({ type: "USER_LOADING" })
    try {
      const reponse = await axios.get(
        `${process.env.GATSBY_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const user = reponse.data
      const isEmailConfirmed = user.confirmed

      if (isEmailConfirmed) {
        dispatch({ type: "USER_UPDATE", payload: { token, user } })
        navigate("/app/clinic-dashboard/profile-settings", { replace: true })
      } else {
        console.log("HANDLE ERROR....")
        dispatch({ type: "USER_ERROR" })
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: "USER_ERROR" })
    }
  }

  return (
    <MainDashboardStyled>
      <div className="dashWrap">
        <div className="dashWelcome">
          <p></p>
          <h2>Welcome to my Dashboard</h2>
        </div>
        {!confirmed && (
          <div className="pleaseConfirm">
            <p>
              Please confirm your email address before continuing with your
              profile setup.
            </p>
            <p>
              An email was sent to <strong>{email}</strong>, if you already
              confirmed, setup your profile.
            </p>

            <button onClick={handleConfirmedEmail}>setup profile</button>
          </div>
        )}
      </div>
    </MainDashboardStyled>
  )
}

const MainDashboardStyled = styled.div`
  align-self: stretch;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    width: calc(70vw);
  }

  .dashWrap {
    width: calc(100% - 5rem);
    max-width: 75rem;
    margin-left: 5rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .dashWelcome {
    width: 100%;

    h2 {
      ${H1DarkPurple};
    }
  }

  .pleaseConfirm {
    width: 100%;

    p {
      ${B1CharcoalGrey};
      margin-bottom: 1rem;
    }
    button {
      ${Btn1DarkPurple};
      margin-top: 2rem;
    }
  }
`

export default MainDashboard
