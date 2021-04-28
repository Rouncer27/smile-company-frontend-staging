// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
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
      [event.target.id]: !formData[event.target.id],
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

    if (state.profile.has_short_fee)
      navigate("/app/clinic-dashboard", { replace: true })
  }, [profile])

  const timesDontMakeSense =
    formData.shift_start !== "" &&
    formData.shift_end !== "" &&
    formData.shift_start >= formData.shift_end

  const disableSubmit =
    formData.hiringFees &&
    formData.notifyAgree &&
    formData.shortNotice &&
    formData.shift_start !== "" &&
    formData.shift_end !== "" &&
    formData.address !== "" &&
    formData.location !== "" &&
    formData.position !== "" &&
    !timesDontMakeSense

  return (
    <MainCreateBookingStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          {state.profile && state.profile.profile_satisfied && (
            <p>
              <span /> {state.profile && state.profile.clinic_name}
            </p>
          )}
          <h2>Create a Booking Request</h2>
          <p className="dashTitle__subcontent">
            Please fill in the booking details you are looking for so that we
            can match you with the right personnel. Repeat this process every
            time you need additional help.
          </p>
          <p className="dashTitle__disclaimer">
            If your booking can't be filled we will not charge you for this
            booking. Your booking credit will be refunded. 
            <br />
            Cancellations with less than 24 hours are subjected to a $50 fee 
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
                timesDontMakeSense={timesDontMakeSense}
              />

              <RadioInput
                name="position"
                label="What profession are you booking for?"
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
                label="What location are you looking for?"
                handleOnRadioChange={handleOnChange}
                value={formData.location}
                options={[
                  {
                    id: "nwCalgary",
                    label: "NW Calgary",
                  },
                  {
                    id: "neCalgary",
                    label: "NE Calgary",
                  },
                  {
                    id: "swCalgary",
                    label: "SW Calgary",
                  },
                  {
                    id: "seCalgary",
                    label: "SE Calgary",
                  },
                  { id: "innerCityCalgary", label: "Inner-city Calgary" },
                  { id: "airdrie", label: "Airdrie" },
                  { id: "chestermere", label: "Chestermere" },
                  { id: "cochrane", label: "Cochrane" },
                  { id: "okotoks", label: "Okotoks" },
                  { id: "crossfield", label: "Crossfield" },
                  { id: "canmore", label: "Canmore (travel time paid)" },
                  { id: "banff", label: "Banff (travel time paid)" },
                  {
                    id: "siksikaMorley",
                    label: "Siksika / Morley (travel time paid)",
                  },
                ]}
              />

              <Input
                label="Clinic Name / street address / parking information"
                name="address"
                type="text"
                placeholder="Clinic Name / street address / parking information"
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
                <button disabled={!disableSubmit} type="submit">
                  Submit Booking
                </button>
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

    p.dashTitle__disclaimer {
      ${Nav1CharcoalGrey};
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
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
        background-color: ${colors.error};
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
          width: calc(100% - 2rem);

          @media (min-width: 1025px) {
            width: calc(65% - 2rem);
            margin-right: 2rem;
          }
        }

        &__time {
          width: calc(100% - 2rem);

          @media (min-width: 1025px) {
            width: calc(35% - 2rem);
            margin-left: 2rem;
          }

          .inputError {
            color: rgba(255, 0, 0, 1);

            &:hover {
              color: rgba(255, 0, 0, 1);
              cursor: inherit;
            }
          }

          &--startTime {
            margin-top: 5rem;
            margin-bottom: 5rem;

            @media (min-width: 1025px) {
              margin-top: 0;
            }

            input {
              width: 100%;
              padding: 1rem 2rem;
              border: 0.2rem solid ${colors.colorSecondary};
              border-color: ${colors.colorSecondary};
              border-radius: 1rem;
              box-shadow: 0 0 0 0 rgba(1, 0, 0, 0.5);
              background-color: rgba(208, 204, 202, 0.25);

              &:focus {
                outline: none;
                border-color: ${colors.colorTertiary};
              }

              &::placeholder {
                color: ${colors.colorAccent};
              }
            }

            .react-datepicker__time-container {
              width: 18rem !important;
            }
          }

          &--endTime {
            margin-top: 5rem;

            input {
              width: 100%;
              padding: 1rem 2rem;
              border: 0.2rem solid ${colors.colorSecondary};
              border-color: ${colors.colorSecondary};
              border-radius: 1rem;
              box-shadow: 0 0 0 0 rgba(1, 0, 0, 0.5);
              background-color: rgba(208, 204, 202, 0.25);

              &:focus {
                outline: none;
                border-color: ${colors.colorTertiary};
              }

              &::placeholder {
                color: ${colors.colorAccent};
              }
            }

            .react-datepicker__time-container {
              width: 18rem !important;
            }
          }
        }

        &__wrapper {
          display: flex;
          flex-wrap: wrap;
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
