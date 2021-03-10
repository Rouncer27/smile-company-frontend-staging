// NPM Packages
import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getProfile from "./actions/getProfile"
import getConfirmEmail from "./actions/getConfirmEmail"
// Common styles
import mainSection from "./styles/mainSection"
import dashWrap from "./styles/dashWrap"
import dashTitle from "./styles/dashTitle"
import {
  B1CharcoalGrey,
  Btn1DarkPurple,
  colors,
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
    await getProfile(token, userId, dispatch)
  }

  useEffect(() => {
    handleGetProfileOnMount()
  }, [])

  const handleConfirmedEmail = async () => {
    await getConfirmEmail(token, dispatch)
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
        {confirmed && state.profile && !state.profile.profile_satisfied && (
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
          <>
            <div className="mainDashContent">
              <h3>
                Hello {state.profile.clinic_name},<br />
                This is your dashboard for all of your clinic profile
                information. This is where you will set up, review and manage
                your bookings.
              </h3>
            </div>
            <div className="mainDashCredits">
              <p>
                Current account credits:{" "}
                {state.profile.monthly_subscription ? (
                  <span>Monthly Subsciption - Unlimited Booking</span>
                ) : (
                  <span>
                    {state.profile.credits ? state.profile.credits : 0}
                  </span>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </MainDashboardStyled>
  )
}

const MainDashboardStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }

  .dashWelcome {
    ${dashTitle};
  }

  .setupProfile,
  .pleaseConfirm {
    width: 100%;

    p {
      ${B1CharcoalGrey};
      margin-bottom: 1rem;
    }
    button,
    a {
      ${Btn1DarkPurple};
      margin-top: 2rem;
    }
  }

  .mainDashContent {
    width: 100%;
    h3 {
      ${H4Lavender};
    }
  }

  .mainDashCredits {
    width: 100%;
    margin-top: 2.5rem;
    padding: 5rem 2.5rem;
    border-radius: 2.5rem;
    background-color: rgba(173, 137, 166, 0.25);

    p {
      ${H4Lavender};
      margin: 0;

      span {
        font-weight: bold;
        color: ${colors.colorTertiary};
      }
    }
  }
`

export default MainDashboard
