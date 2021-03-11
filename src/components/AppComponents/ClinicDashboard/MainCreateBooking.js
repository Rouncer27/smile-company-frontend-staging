// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import postCreateBooking from "./actions/postCreateBooking"
import getProfile from "./actions/getProfile"
// Common styles
import mainSection from "./styles/mainSection"
import dashWrap from "./styles/dashWrap"
import dashTitle from "./styles/dashTitle"
import {
  colors,
  H4Lavender,
  Btn1DarkPurple,
  Nav1CharcoalGrey,
} from "../../../styles/helpers"
// Components
import DateTimePicker from "../FormFields/DateTimePicker"
import RadioInput from "../FormFields/RadioInput"
import CheckBoxInput from "../FormFields/CheckBoxInput"
import Input from "../FormFields/Input"

const MainCreateBooking = () => {
  const [state, dispatch] = useContext(UserContext)
  const [hasCredits, setHasCredits] = useState(false)
  const { token, user, profile } = state
  const userId = user.id

  var tomorrow = new Date()
  tomorrow.setDate(new Date().getDate() + 1)

  const [formData, setFormData] = useState({
    day: tomorrow,
    shift_start: "",
    shift_end: "",
    location: "",
    address: "",
    position: "",
    notifyAgree: false,
    hiringFees: false,
    shortNotice: false,
  })

  const handleDatePicker = (event, id) => {
    setFormData({
      ...formData,
      [id]: event,
    })
  }

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnCheckBoxChange = event => {
    setFormData({
      ...formData,
      [event.target.id]: true,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    await postCreateBooking(token, dispatch, formData)
  }

  const handleGetProfileOnMount = async () => {
    if (!userId) return
    await getProfile(token, userId, dispatch)
  }

  useEffect(() => {
    handleGetProfileOnMount()
  }, [])

  useEffect(() => {
    if (state.profile.credits > 0 || state.profile.monthly_subscription) {
      setHasCredits(true)
    } else {
      setHasCredits(false)
    }
  }, [profile])

  return (
    <MainCreateBookingStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {state.profile && state.profile.profile_satisfied && (
            <p>
              <span /> {state.profile && state.profile.clinic_name}
            </p>
          )}
          <h2>Create a Booking</h2>
          <p className="dashTitle__subcontent">
            Please fill in the booking details you are looking for so that we
            can match you with the right personnel.
          </p>
        </div>
        {!hasCredits && (
          <div className="dashAlert">
            <p className="creditAlert">
              <span>WARNING</span>
              Your account currently has no credits or monthly subscriptions.
              Please purchase a booking package from the left side menu to be
              able to create a booking.
            </p>
          </div>
        )}
        <div className="mainForm">
          <form onSubmit={event => handleOnSubmit(event)}>
            <fieldset disabled={!hasCredits}>
              <DateTimePicker
                day={formData.day}
                setDay={handleDatePicker}
                startTime={formData.shift_start}
                setStartTime={handleDatePicker}
                endTime={formData.shift_end}
                setEndTime={handleDatePicker}
              />

              <RadioInput
                name="position"
                label="What profession are you hiring for?"
                handleOnRadioChange={handleOnChange}
                value={formData.position}
                options={[
                  {
                    id: "rda",
                    label: "RDA",
                  },
                  { id: "rdh", label: "RDH" },
                  { id: "admin", label: "Admin" },
                  {
                    id: "sterilizationAssistant",
                    label: "Sterilization Assistant",
                  },
                ]}
              />

              <RadioInput
                name="location"
                label="What location area are you looking placement in?"
                handleOnRadioChange={handleOnChange}
                value={formData.location}
                options={[
                  {
                    id: "nwNeSwSeCalgary",
                    label: "NW, NE, SW, SE Calgary",
                  },
                  { id: "innerCityCalgary", label: "Inner-city Calgary" },
                  { id: "airdrie", label: "Airdrie" },
                  { id: "chestermere", label: "Chestermere" },
                  { id: "cochrane", label: "Cochrane" },
                  { id: "okotoks", label: "Okotoks" },
                  { id: "banff", label: "Banff" },
                ]}
              />

              <Input
                label="clinic street address / location"
                name="address"
                type="text"
                placeholder="clinic street address / location"
                value={formData.address}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
              />

              <div className="formConsent">
                <h2>Smile and Company Standards</h2>
                <CheckBoxInput
                  options={[
                    {
                      id: "notifyAgree",
                      label:
                        "I understand that it is my responsibility to notify Smile and Company of any bookings made with Smile and Company personnel/temps (fees will apply). Failure to do so will result in an additional fee and termination of Smile and Company’s services.",
                    },
                    {
                      id: "hiringFees",
                      label:
                        "I understand that permanent hiring fees will apply if hiring Smile and Company personnel/temps",
                    },
                    {
                      id: "shortNotice",
                      label:
                        "I understand that a $50 fee will be applied for short notice cancellations (less than 24 hours) for any reason.",
                    },
                  ]}
                  onChange={handleOnCheckBoxChange}
                />
              </div>
              <div className="submitButton">
                <button type="submit">Submit Booking</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </MainCreateBookingStyled>
  )
}

const MainCreateBookingStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }

  .dashTitle {
    ${dashTitle};

    p.dashTitle__subcontent {
      ${H4Lavender};
    }
  }

  .dashAlert {
    margin: 4rem 0 0;
    p {
      ${Nav1CharcoalGrey};
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }

      span {
        display: block;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        background-color: #ed4f32;
        color: ${colors.black} !important;
        text-align: center;
      }
    }
  }

  .dashContent {
    width: 100%;
    margin: 5rem auto;
  }

  .mainForm {
    width: 100%;
    max-width: 60rem;
    margin: 0;
    margin-bottom: 2.5rem;
    padding-bottom: 5rem;

    fieldset {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      border: none;

      .shiftPicker {
        margin: 2.5rem 0;

        p {
          ${Nav1CharcoalGrey};

          &:hover {
            color: ${colors.colorAlt};
            cursor: inherit;
          }
        }

        &__calendar {
          width: calc(65% - 2rem);
          margin-right: 2rem;
        }

        &__time {
          width: calc(35% - 2rem);
          margin-left: 2rem;

          &--startTime {
            margin-bottom: 5rem;
          }
        }

        &__wrapper {
          display: flex;
          justify-content: space-between;
        }
      }

      .formConsent {
        margin-top: 5rem;
        h2 {
          ${H4Lavender};
          margin: 0;
        }
      }

      .submitButton {
        width: 100%;
        padding-top: 3rem;
        padding-left: 0.5rem;

        button {
          ${Btn1DarkPurple};
        }
      }
    }
  }
`

export default MainCreateBooking
