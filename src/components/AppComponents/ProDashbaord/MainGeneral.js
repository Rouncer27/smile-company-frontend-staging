import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
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
import putGeneralInfo from "./actions/putGeneralInfo"

import Input from "../FormFields/Input"
import RadioInput from "../FormFields/RadioInput"
import TextArea from "../FormFields/Textarea"

const MainGeneral = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const userId = user._id
  const profileId = profile && profile.id
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    position: "",
    experience: "",
    year_graduated: "",
    school: "",
    clinics_worked_at: "",
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
      position: state.profile.position ? state.profile.position : "",
      experience: state.profile.experience ? state.profile.experience : "",
      year_graduated: state.profile.year_graduated
        ? state.profile.year_graduated
        : "",
      school: state.profile.school ? state.profile.school : "",
      clinics_worked_at: state.profile.clinics_worked_at
        ? state.profile.clinics_worked_at
        : "",
    })
  }

  useEffect(() => {
    // If this person is not confirmed yet, send them back to the main dashboard. //
    if (!state.user && !state.user.confirmed)
      return navigate("/app/clinic-dashboard", { replace: true })
    getUserProfile(token, userId, state.user.confirmed, dispatch)
    updateFormFields()
  }, [])

  return (
    <MainGeneralStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p>
            <span /> {state.profile && state.profile.username}
          </p>
          <h2>General Information</h2>
        </div>
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
              <RadioInput
                label="Position"
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
              <RadioInput
                label="Years Experience"
                name="experience"
                handleOnRadioChange={handleOnChange}
                value={formData.experience}
                options={[
                  {
                    id: "oneYear",
                    label: "Less than 1 year",
                  },
                  { id: "twoFiveYear", label: "1 to 5 years" },
                  { id: "sixNineYear", label: "6 to 9 years" },
                  {
                    id: "tenPlus",
                    label: "10 years +",
                  },
                ]}
              />
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
              <TextArea
                label="Clinics Worked At"
                name="clinics_worked_at"
                type="text"
                placeholder="Clinics Worked At"
                value={formData.clinics_worked_at}
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
      </div>
    </MainGeneralStyled>
  )
}

const MainGeneralStyled = styled.div`
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

export default MainGeneral
