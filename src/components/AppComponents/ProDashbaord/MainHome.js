// NPM Packages
import React, { useContext, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getUserProfile from "./actions/getUserProfile"
import getConfirmedEmail from "./actions/getConfirmedEmail"
// Common styles
import mainSection from "./style/mainSection"
import dashWrap from "./style/dashWrap"
import dashTitle from "./style/dashTitle"
import dashAlert from "./style/dashAlert"
import {
  B1CharcoalGrey,
  Btn1DarkPurple,
  colors,
  H4Lavender,
  Nav1CharcoalGrey,
} from "../../../styles/helpers"
// Helpers
import getReadablePosition from "./helper/getReadablePosition"
import getReadableLocation from "./helper/getReadableLocation"
import getReadableExperience from "./helper/getReadableExperience"

const MainHome = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user } = state
  const { confirmed, email } = user
  const userId = user.id

  const handleGetProfileOnMount = async () => {
    await getUserProfile(token, userId, state.user.confirmed, dispatch)
  }

  useEffect(() => {
    handleGetProfileOnMount()
  }, [])

  const capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const underReview =
    state.profile.profile_satisfied && !state.profile.user_approved

  return (
    <MainHomeStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {state.user && state.user.username && (
            <p>
              <span /> {state.user.username}
            </p>
          )}
          <h2>Welcome to my Dashboard</h2>
        </div>
        {underReview && (
          <div className="dashAlert">
            <span className="alertIndicator">Alert</span>
            <p>
              We are reviewing your application and will be in touch with you
              shortly.
            </p>
          </div>
        )}
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

            <button onClick={() => getConfirmedEmail(token, dispatch)}>
              setup profile
            </button>
          </div>
        )}
        {state.profile && confirmed && (
          <div className="dashWelcome">
            <p>
              Hello{" "}
              {state.profile && state.profile.first_name
                ? state.profile.first_name
                : state.user.username}
            </p>
            <p>
              This is your dashboard for all of your profile information.
              <br />
              Remember to keep your availability up to date.
            </p>
          </div>
        )}
        {state.profile && confirmed && !state.profile.general_satisfied && (
          <div className="dashWarn">
            <p>
              Start setting up your profile by filling out your general
              information
            </p>
            <Link to="/app/professional-dashboard/general">
              Setup General Information
            </Link>
          </div>
        )}

        {state.profile &&
          confirmed &&
          state.profile.general_satisfied &&
          !state.profile.experience_satisfied && (
            <div className="dashWarn">
              <p>
                Continue setting up your profile by filling out your experience
              </p>
              <Link to="/app/professional-dashboard/experience">
                Fill Out Experience
              </Link>
            </div>
          )}
        {state.profile &&
          confirmed &&
          state.profile.general_satisfied &&
          state.profile.experience_satisfied &&
          !state.profile.contact_satisfied && (
            <div className="dashWarn">
              <p>
                Finish the setup of your profile by filling out your
                availability information
              </p>
              <Link to="/app/professional-dashboard/availability">
                Fill Out Availability
              </Link>
            </div>
          )}
        {state.profile && confirmed && state.profile.general_satisfied && (
          <div className="dashGeneral">
            <h2>General Information</h2>
            <p>
              <span className="name">{state.profile.first_name}</span>{" "}
              <span className="name">{state.profile.last_name}</span>
            </p>
            <p>
              Text Messages will be sent to:{" "}
              <span>{state.profile.mobile_phone}</span>
            </p>
            <p>
              Home Number:{" "}
              <span>
                {state.profile.home_phone
                  ? state.profile.home_phone
                  : "No home phone given"}
              </span>
            </p>
            <p>
              Email Notifications will be sent to:{" "}
              <span>{state.user.email}</span>
            </p>
            <p>
              Position:{" "}
              <span>
                {state.profile.position &&
                  getReadablePosition(state.profile.position)}
              </span>
            </p>

            <p>
              Year Graduated: <span>{state.profile.year_graduated}</span>
            </p>
            <p>
              School Graduated: <span>{state.profile.school}</span>
            </p>
            <p>
              Wage Expectations: <span>{state.profile.wage}</span>
            </p>
          </div>
        )}
        {state.profile &&
          confirmed &&
          state.profile.general_satisfied &&
          state.profile.experience_satisfied && (
            <div className="dashExperience">
              <h2>Experience</h2>
              <p>
                Experience:{" "}
                <span>
                  {state.profile.experience &&
                    getReadableExperience(state.profile.experience)}
                </span>
              </p>
              <p>
                Clinics Worked At:{" "}
                <span>{state.profile.clinics_worked_at}</span>
              </p>
              {state.profile.associated_registration_number !== "" && (
                <p>
                  Associated Registration Number:{" "}
                  <span>{state.profile.associated_registration_number}</span>
                </p>
              )}
              {state.profile.name_registered_with !== "" && (
                <p>
                  Name Registered With:{" "}
                  <span>{state.profile.name_registered_with}</span>
                </p>
              )}
              <p>
                Dental Software : <span>{state.profile.dental_software}</span>
              </p>
              <p>
                Additional Qualifications:{" "}
                <span>
                  {state.profile.additional_qualifications !== ""
                    ? state.profile.additional_qualifications
                    : "No information filled out."}
                </span>
              </p>
              <p>
                Greatest Strengths:{" "}
                <span>{state.profile.greatest_strengths}</span>
              </p>
            </div>
          )}
        {state.profile &&
          confirmed &&
          state.profile.general_satisfied &&
          state.profile.experience_satisfied &&
          state.profile.contact_satisfied && (
            <div className="dashContact">
              <h2>My Availability</h2>
              <p>
                Days of temp job posting I want to be notified about:{" "}
                {state.profile.days_working.map(day => (
                  <span className="daysOfTheWeek" key={day}>
                    {capitalize(day)}
                  </span>
                ))}
              </p>
              <p>
                Locations of temp job posting I want to be notified about
                (Please note: travel time paid for Siksika / Morley, Banff and
                Canmore.):
                {state.profile.locations_working.map(location => {
                  const displayName = getReadableLocation(location)
                  return (
                    <span className="daysOfTheWeek" key={location}>
                      {capitalize(displayName)}
                    </span>
                  )
                })}
              </p>
            </div>
          )}
      </div>
    </MainHomeStyled>
  )
}

const MainHomeStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }

  .dashAlert {
    ${dashAlert};
  }

  .dashTitle {
    ${dashTitle};

    p.dashTitle__subcontent {
      ${H4Lavender};
    }
  }

  .dashWelcome {
    p {
      ${H4Lavender};
      margin: 0;
    }
  }

  .dashWarn {
    width: 100%;
    margin: 3rem 0 2rem;

    p {
      ${H4Lavender};
      margin: 0;
      margin-bottom: 2rem;
    }

    a {
      ${Btn1DarkPurple};
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

  .dashGeneral,
  .dashExperience,
  .dashContact {
    width: 100%;
    margin-top: 5rem;
    padding: 2rem 2.5rem;
    border-radius: 2.5rem;
    background-color: rgba(173, 137, 166, 0.25);

    h2 {
      ${H4Lavender};
    }

    p {
      ${Nav1CharcoalGrey};
      margin-bottom: 1rem;
      font-weight: normal;
      cursor: inherit;

      &:hover {
        color: ${colors.colorAlt};
      }

      span {
        display: inline-block;
        padding-left: 1rem;
        font-weight: bold;
        color: ${colors.colorPrimary};
      }

      span.name {
        padding: 0;
      }
    }
  }

  .dashContact,
  .dashExperience {
    margin-top: 2.5rem;
  }
  .dashContact {
    p {
      .daysOfTheWeek {
        display: block;
        margin-top: 0.5rem;
        padding: 0;
      }
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

export default MainHome
