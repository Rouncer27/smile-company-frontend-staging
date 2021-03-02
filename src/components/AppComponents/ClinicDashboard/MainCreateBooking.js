import React, { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import { navigate } from "gatsby"

import {
  B1Sage,
  colors,
  H1DarkPurple,
  H4Lavender,
  Btn1DarkPurple,
  Nav1CharcoalGrey,
} from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"
import { Link } from "gatsby"

import DateTimePicker from "../FormFields/DateTimePicker"
import RadioInput from "../FormFields/RadioInput"
import CheckBoxInput from "../FormFields/CheckBoxInput"
import Input from "../FormFields/Input"

const MainCreateBooking = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const { invoices } = profile
  const userId = user.id
  const credits = state.profile.credits
  const subcription = state.profile.monthly_subscription

  const [formData, setFormData] = useState({
    day: "",
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

  const resetFormData = () => {
    setFormData({
      day: "",
      shift_start: "",
      shift_end: "",
      location: "",
      address: "",
      position: "",
      notifyAgree: false,
      hiringFees: false,
      shortNotice: false,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    dispatch({ type: "USER_LOADING" })
    try {
      const response = await axios.post(
        `${process.env.GATSBY_API_URL}/bookings`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(
        "RESPONSE FROM THE SERVER AFTER BOOKING CREATE: ",
        response.data
      )

      dispatch({
        type: "USER_ALERT",
        payload: {
          message: `Congratulations! You have created a booking. You can always review your bookings history from your dashboard under Review Bookings in the left side menu.`,
        },
      })
      return navigate("/app/clinic-dashboard", { replace: true })
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

  console.log("HERE IS THE FORM STATE: ", formData)

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
        <div className="mainForm">
          <form onSubmit={event => handleOnSubmit(event)}>
            <fieldset>
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

    p.dashTitle__subcontent {
      ${H4Lavender};
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
