import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import {
  B1Sage,
  colors,
  H1DarkPurple,
  Nav1CharcoalGrey,
  H4Lavender,
  Btn1DarkPurple,
} from "../../../styles/helpers"
import { UserContext } from "../../../context/UserContext"

import getUserProfile from "./actions/getUserProfile"
import putContactInformation from "./actions/putContactInformation"

import Input from "../FormFields/Input"
import CheckBoxInput from "../FormFields/CheckBoxInput"

const MainContact = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const userId = user.id
  const profileId = profile && profile.id
  const [formData, setFormData] = useState({
    mobile_phone: "",
    home_phone: "",
    email: "",
    days_working: [],
    locations_working: [],
  })

  console.log("FORM DATA Locations: ", formData.locations_working)

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    putContactInformation(token, profileId, dispatch, formData)
  }

  const updateFormFields = () => {
    setFormData({
      mobile_phone: state.profile.mobile_phone
        ? state.profile.mobile_phone
        : "",
      home_phone: state.profile.home_phone ? state.profile.home_phone : "",
      email: state.profile.email ? state.profile.email : "",
      days_working: state.profile.days_working
        ? state.profile.days_working
        : [],
      locations_working: state.profile.locations_working
        ? state.profile.locations_working
        : [],
    })
  }

  useEffect(() => {
    // If this person is not confirmed yet, send them back to the main dashboard. //
    if (!state.user && !state.user.confirmed)
      return navigate("/app/clinic-dashboard", { replace: true })
    getUserProfile(token, userId, state.user.confirmed, dispatch)
    updateFormFields()
  }, [])

  const handleOnDayCheck = event => {
    const checkValue = event.target.value
    const copyOfChecked = formData.days_working
    const checkedIndex = formData.days_working.indexOf(checkValue)

    if (checkedIndex !== -1) {
      copyOfChecked.splice(checkedIndex, 1)
      setFormData({
        ...formData,
        days_working: copyOfChecked,
      })
    } else {
      copyOfChecked.push(checkValue)
      setFormData({
        ...formData,
        days_working: copyOfChecked,
      })
    }
  }

  const checkIfDayChecked = name => {
    const checked =
      formData.days_working.find(day => day === name) === undefined
        ? false
        : true
    return checked
  }

  const handleOnLocationCheck = event => {
    const checkValue = event.target.value
    const copyOfChecked = formData.locations_working
    const checkedIndex = formData.locations_working.indexOf(checkValue)

    if (checkedIndex !== -1) {
      copyOfChecked.splice(checkedIndex, 1)
      setFormData({
        ...formData,
        locations_working: copyOfChecked,
      })
    } else {
      copyOfChecked.push(checkValue)
      setFormData({
        ...formData,
        locations_working: copyOfChecked,
      })
    }
  }

  const checkIfLocationChecked = name => {
    const checked =
      formData.locations_working.find(location => location === name) ===
      undefined
        ? false
        : true
    return checked
  }

  return (
    <MainContactStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p>
            <span /> {state.profile && state.profile.username}
          </p>
          <h2>Contact Information</h2>
        </div>
        <div className="mainForm">
          <form onSubmit={event => handleOnSubmit(event)}>
            <fieldset>
              <Input
                label="Mobile Phone Number (for text messages)"
                name="mobile_phone"
                type="text"
                placeholder="Mobile Phone Number"
                value={formData.mobile_phone}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
              />
              <Input
                label="Home Phone Number (optional)"
                name="home_phone"
                type="text"
                placeholder="Home Phone Number"
                value={formData.home_phone}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="Email"
                name="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
              />
              <CheckBoxInput
                name="days_working"
                label="I want to be notified of Temp job postings that fall on these days of the week"
                options={[
                  {
                    id: "monday",
                    label: "Monday",
                    checked: checkIfDayChecked("monday"),
                  },
                  {
                    id: "tuesday",
                    label: "Tuesday",
                    checked: checkIfDayChecked("tuesday"),
                  },
                  {
                    id: "wednesday",
                    label: "Wednesday",
                    checked: checkIfDayChecked("wednesday"),
                  },
                  {
                    id: "thursday",
                    label: "Thursday",
                    checked: checkIfDayChecked("thursday"),
                  },
                  {
                    id: "friday",
                    label: "Friday",
                    checked: checkIfDayChecked("friday"),
                  },
                  {
                    id: "saturday",
                    label: "Saturday",
                    checked: checkIfDayChecked("saturday"),
                  },
                  {
                    id: "sunday",
                    label: "Sunday",
                    checked: checkIfDayChecked("sunday"),
                  },
                ]}
                onChange={handleOnDayCheck}
              />

              <CheckBoxInput
                name="locations_working"
                label="I want to be notified of Temp job postings that are at these locations"
                options={[
                  {
                    id: "nwNeSwSeCalgary",
                    label: "NW NE SW SW Calgary",
                    checked: checkIfLocationChecked("nwNeSwSeCalgary"),
                  },
                  {
                    id: "innerCityCalgary",
                    label: "Inner City Calgary",
                    checked: checkIfLocationChecked("innerCityCalgary"),
                  },
                  {
                    id: "airdrie",
                    label: "Airdrie",
                    checked: checkIfLocationChecked("airdrie"),
                  },
                  {
                    id: "chestermere",
                    label: "Chestermere",
                    checked: checkIfLocationChecked("chestermere"),
                  },
                  {
                    id: "cochrane",
                    label: "Cochrane",
                    checked: checkIfLocationChecked("cochrane"),
                  },
                  {
                    id: "okotoks",
                    label: "Okotoks",
                    checked: checkIfLocationChecked("okotoks"),
                  },
                  {
                    id: "banff",
                    label: "Banff",
                    checked: checkIfLocationChecked("banff"),
                  },
                ]}
                onChange={handleOnLocationCheck}
              />
              <div className="submitButton">
                <button type="submit">Submit Information</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </MainContactStyled>
  )
}

const MainContactStyled = styled.div`
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

export default MainContact
