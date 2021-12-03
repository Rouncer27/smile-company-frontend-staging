// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import _ from "lodash"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getUserProfile from "./actions/getUserProfile"
import putContactInformation from "./actions/putContactInformation"
// Common styles
import mainSection from "./style/mainSection"
import dashWrap from "./style/dashWrap"
import dashTitle from "./style/dashTitle"
import {
  colors,
  Nav1CharcoalGrey,
  H4Lavender,
  Btn1DarkPurple,
} from "../../../styles/helpers"
// Components
import LoadingSkeleton from "./UiComponents/LoadingSkeleton"
import CheckBoxInput from "../FormFields/CheckBoxInput"

const MainAvailability = () => {
  const [needToSave, setNeedToSave] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const { user, profile, token } = state
  const userId = user.id
  const profileId = profile && profile.id
  const [formData, setFormData] = useState({
    days_working: [],
    locations_working: [],
  })

  const onServerDays =
    profile.days_working !== undefined ? profile.days_working : []
  const onServerLocation =
    profile.locations_working !== undefined ? profile.locations_working : []

  useEffect(() => {
    const daysEqual = _.isEqual(
      formData.days_working.sort(),
      onServerDays.sort()
    )
    const locationsEqual = _.isEqual(
      formData.locations_working.sort(),
      onServerLocation.sort()
    )
    const shouldSave = !daysEqual ? true : !locationsEqual ? true : false
    setNeedToSave(shouldSave)
  }, [formData])

  const handleOnSubmit = async event => {
    event.preventDefault()
    await putContactInformation(token, profileId, dispatch, formData)
  }

  const updateFormFields = () => {
    setFormData({
      days_working: state.profile.days_working
        ? state.profile.days_working
        : [],
      locations_working: state.profile.locations_working
        ? state.profile.locations_working
        : [],
    })
  }

  const handleGetProfileOnMount = async () => {
    await getUserProfile(token, userId, state.user.confirmed, dispatch)
    updateFormFields()
  }

  useEffect(() => {
    handleGetProfileOnMount()
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
    <MainAvailabilityStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p>
            <span /> {state.profile && state.profile.username}
          </p>
          <h2>My Availability</h2>
        </div>
        {!state.loading ? (
          <div className="mainForm">
            <form onSubmit={event => handleOnSubmit(event)}>
              <fieldset>
                <CheckBoxInput
                  name="days_working"
                  label="I want to be notified of temporary job postings that fall on these days of the week"
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
                  label="I want to be notified of Temp job postings that are at these locations. Please note: travel time paid for Siksika / Morley, Banff and Canmore."
                  options={[
                    {
                      id: "nwCalgary",
                      label: "NW Calgary",
                      checked: checkIfLocationChecked("nwCalgary"),
                    },
                    {
                      id: "neCalgary",
                      label: "NE Calgary",
                      checked: checkIfLocationChecked("neCalgary"),
                    },
                    {
                      id: "swCalgary",
                      label: "SW Calgary",
                      checked: checkIfLocationChecked("swCalgary"),
                    },
                    {
                      id: "seCalgary",
                      label: "SE Calgary",
                      checked: checkIfLocationChecked("seCalgary"),
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
                      id: "crossfield",
                      label: "Crossfield",
                      checked: checkIfLocationChecked("crossfield"),
                    },
                    {
                      id: "canmore",
                      label: "Canmore (travel time paid)",
                      checked: checkIfLocationChecked("canmore"),
                    },
                    {
                      id: "banff",
                      label: "Banff (travel time paid)",
                      checked: checkIfLocationChecked("banff"),
                    },
                    {
                      id: "siksikaMorley",
                      label: "Siksika / Morley (travel time paid)",
                      checked: checkIfLocationChecked("siksikaMorley"),
                    },
                  ]}
                  onChange={handleOnLocationCheck}
                />
                <div className="submitButton">
                  <button disabled={!needToSave} type="submit">
                    {profile.experience_satisfied
                      ? "Save Updated Availability"
                      : "Submit Availability"}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </MainAvailabilityStyled>
  )
}

const MainAvailabilityStyled = styled.div`
  ${mainSection};

  .dashWrap {
    ${dashWrap};
  }

  .dashTitle {
    ${dashTitle};
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

export default MainAvailability
