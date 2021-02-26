import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"

import TimePicker from "react-time-picker"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"

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

import Input from "../FormFields/Input"
import DateTimePicker from "../FormFields/DateTimePicker"
import DatePicker from "../FormFields/DatePicker"
import RadioInput from "../FormFields/RadioInput"
import CheckBoxInput from "../FormFields/CheckBoxInput"

const MainCreateBooking = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const { invoices } = profile
  const userId = user.id
  const credits = state.profile.credits
  const subcription = state.profile.monthly_subscription

  const [formData, setFormData] = useState({
    daysRequired: 1,
    location: "",
    salary: "",
    hireDate: "",
    expireDate: "",
    experience: "",
    qualifications: "",
    strengths: "",
    notifyAgree: false,
    hiringFees: false,
  })

  const handleSelectDay = (event, id) => {
    setFormData({
      ...formData,
      [`selectedDay-${id}`]: event,
    })
  }

  const handleSelectTimeStart = (event, id) => {
    setFormData({
      ...formData,
      [`selectedTimeStart-${id}`]: event,
    })
  }

  const handleSelectTimeEnd = (event, id) => {
    setFormData({
      ...formData,
      [`selectedTimeEnd-${id}`]: event,
    })
  }

  const handleAddShift = () => {
    const newDaysRequired = formData.daysRequired + 1
    setFormData({
      ...formData,
      daysRequired: newDaysRequired,
    })
  }

  const handleDatePicker = (event, id) => {
    console.log("DATE PICKER", event, id)

    setFormData({
      ...formData,
      [id]: event,
    })
  }

  const handleOnChange = event => {
    console.log("RADIO!!!!", event.target.id)
    console.log("RADIO!!!!", event.target.name)
    console.log("RADIO!!!!", event.target.value)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnCheckBoxChange = event => {
    console.log("RADIO!!!!", event.target.id)
    console.log("RADIO!!!!", event.target.name)
    console.log("RADIO!!!!", event.target.value)
    setFormData({
      ...formData,
      [event.target.id]: true,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    console.log("SUBMIT!!!!")
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
              {[...Array(formData.daysRequired)].map((index, i) => {
                const currentDayIndex = i + 1
                return (
                  <DateTimePicker
                    key={index}
                    day={formData[`selectedDay-${currentDayIndex}`]}
                    setDay={handleSelectDay}
                    startTime={formData[`selectedTimeStart-${currentDayIndex}`]}
                    setStartTime={handleSelectTimeStart}
                    endTime={formData[`selectedTimeEnd-${currentDayIndex}`]}
                    setEndTime={handleSelectTimeEnd}
                    id={`${currentDayIndex}`}
                  />
                )
              })}

              {/* <button type="button" onClick={handleAddShift}>
                Add Another Day
              </button> */}
              <RadioInput
                name="location"
                label="What location area are you looking placement in? (check all that apply):"
                handleOnRadioChange={handleOnChange}
                value={formData.location}
                options={[
                  {
                    id: "nw-ne-sw-se-calgary",
                    label: "NW, NE, SW, SE Calgary",
                  },
                  { id: "inner-city-calgary", label: "Inner-city Calgary" },
                  { id: "airdrie", label: "Airdrie" },
                  { id: "chestermere", label: "Chestermere" },
                  { id: "cochrane", label: "Cochrane" },
                  { id: "okotoks", label: "Okotoks" },
                  { id: "banff", label: "Banff" },
                ]}
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
                  { id: "chestermere", label: "Chestermere" },
                  {
                    id: "sterilizationAssistant",
                    label: "Sterilization Assistant",
                  },
                ]}
              />

              <Input
                label="What salary range are you offering (per hour)? "
                name="salary"
                type="text"
                placeholder="$/hour"
                value={formData.salary}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
              />

              <DatePicker
                id={"hireDate"}
                label="What is the ideal date that you would like to hire by?"
                value={formData.hireDate}
                onChange={handleDatePicker}
              />

              <DatePicker
                id={"expireDate"}
                label="When should this post expire?"
                value={formData.expireDate}
                onChange={handleDatePicker}
              />

              <RadioInput
                label="How many years of experience would your ideal candidate have?"
                name="experience"
                handleOnRadioChange={handleOnChange}
                value={formData.experience}
                options={[
                  {
                    id: "less1year",
                    label: "Less than one year",
                  },
                  { id: "2to5years", label: "2-5 Years" },
                  { id: "6to9years", label: "6-9 Years" },
                  { id: "10years", label: "10+ Years" },
                ]}
              />

              <Input
                label="What specific qualifications are you seeking?"
                name="qualifications"
                type="text"
                placeholder="qualifications"
                value={formData.qualifications}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
              />

              <Input
                label="What strengths does your ideal candidate possess?"
                name="strengths"
                type="text"
                placeholder="strengths"
                value={formData.strengths}
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
