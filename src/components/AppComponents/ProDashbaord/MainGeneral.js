// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getUserProfile from "./actions/getUserProfile"
import putGeneralInfo from "./actions/putGeneralInfo"
// Components
import Input from "../FormFields/Input"
import RadioInput from "../FormFields/RadioInput"
import TextArea from "../FormFields/Textarea"
import LoadingSkeleton from "./UiComponents/LoadingSkeleton"
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

const MainGeneral = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const userId = user._id
  const profileId = profile && profile.id
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_phone: "",
    home_phone: "",
    position: "",
    year_graduated: "",
    school: "",
    wage: "",
  })

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    await putGeneralInfo(token, profileId, dispatch, formData)
  }

  const updateFormFields = () => {
    setFormData({
      first_name: state.profile.first_name ? state.profile.first_name : "",
      last_name: state.profile.last_name ? state.profile.last_name : "",
      mobile_phone: state.profile.mobile_phone
        ? state.profile.mobile_phone
        : "",
      home_phone: state.profile.home_phone ? state.profile.home_phone : "",
      position: state.profile.position ? state.profile.position : "",
      year_graduated: state.profile.year_graduated
        ? state.profile.year_graduated
        : "",
      school: state.profile.school ? state.profile.school : "",
      wage: state.profile.wage ? state.profile.wage : "",
    })
  }

  const handleGetProfileOnMount = async () => {
    await getUserProfile(token, userId, state.user.confirmed, dispatch)
    updateFormFields()
  }

  useEffect(() => {
    // If this person is not confirmed yet, send them back to the main dashboard. //
    if (!state.user && !state.user.confirmed)
      return navigate("/app/clinic-dashboard", { replace: true })
    handleGetProfileOnMount()
  }, [])

  console.log(profile.profile_satisfied)

  return (
    <MainGeneralStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p>
            <span /> {state.profile && state.profile.username}
          </p>
          <h2>General Information</h2>
        </div>
        {!state.loading ? (
          <div className="mainForm">
            <form onSubmit={event => handleOnSubmit(event)}>
              <fieldset>
                <Input
                  label="First Name"
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleOnChange}
                  fieldvalid={true}
                  required={true}
                  size="half"
                />
                <Input
                  label="Last Name"
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleOnChange}
                  fieldvalid={true}
                  required={true}
                  size="half"
                />
                <Input
                  label="Mobile Phone (for text messages)"
                  name="mobile_phone"
                  type="text"
                  placeholder="Mobile Phone Number"
                  value={formData.mobile_phone}
                  onChange={handleOnChange}
                  fieldvalid={true}
                  required={true}
                  size="half"
                />
                <Input
                  label="Home Phone (optional)"
                  name="home_phone"
                  type="text"
                  placeholder="Home Phone Number"
                  value={formData.home_phone}
                  onChange={handleOnChange}
                  fieldvalid={true}
                  required={false}
                  size="half"
                />
                {!profile.profile_satisfied && (
                  <RadioInput
                    label="Position *** You will not be allowed to change your position once approved, you will need to contact Smile and Company if you wish to change this in the future."
                    name="position"
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
                )}
                <Input
                  label="Year Graduated From Program"
                  name="year_graduated"
                  type="text"
                  placeholder="Year Graduated From Program"
                  value={formData.year_graduated}
                  onChange={handleOnChange}
                  fieldvalid={true}
                  required={true}
                  size="full"
                />
                <Input
                  label="School Graduated From"
                  name="school"
                  type="text"
                  placeholder="School Graduated From"
                  value={formData.school}
                  onChange={handleOnChange}
                  fieldvalid={true}
                  required={true}
                  size="full"
                />
                <Input
                  label="Wage Expectations"
                  name="wage"
                  type="text"
                  placeholder="Wage Expectations"
                  value={formData.wage}
                  onChange={handleOnChange}
                  fieldvalid={true}
                  required={true}
                  size="full"
                />
                <div className="submitButton">
                  <button type="submit">Submit Information</button>
                </div>
              </fieldset>
            </form>
          </div>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </MainGeneralStyled>
  )
}

const MainGeneralStyled = styled.div`
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

export default MainGeneral
