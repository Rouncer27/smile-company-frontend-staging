import { Link, navigate } from "gatsby"
import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { UserContext } from "../../../context/UserContext"

import {
  B1CharcoalGrey,
  Btn1DarkPurple,
  colors,
  H1DarkPurple,
  B1Sage,
  H4Lavender,
} from "../../../styles/helpers"

const MainDashboard = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user } = state
  const { confirmed, email } = user
  const userId = user.id

  const handleGetProfileOnMount = async () => {
    if (!userId) return
    if (!confirmed) return

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
      console.log(response)
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
    handleGetProfileOnMount()
  }, [])

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
      }
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

  return (
    <MainDashboardStyled>
      <div className="dashWrap">
        <div className="dashWelcome">
          {state.profile && state.profile.profile_satisfied && (
            <p>
              <span /> {state.profile && state.profile.clinic_name}
            </p>
          )}
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
        {state.profile && !state.profile.profile_satisfied && (
          <div className="setupProfile">
            <div>
              <p>
                Before you can contiune, you are required to setup your clinics
                profile.
              </p>
              <Link to="/app/clinic-dashboard/profile-settings">
                Clinic Details
              </Link>
            </div>
          </div>
        )}
        {confirmed && state.profile && state.profile.profile_satisfied && (
          <div className="mainDashContent">
            <h3>
              Hello {state.profile.clinic_name},<br />
              This is your dashboard for all of your clinic profile information.
              This is where you will set up, review and manage your bookings.
            </h3>
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
      margin-top: 0;
    }

    p {
      ${B1Sage};
      margin-bottom: 0;
      font-weight: bold;
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

  .mainDashContent {
    h3 {
      ${H4Lavender};
    }
  }
`

export default MainDashboard
