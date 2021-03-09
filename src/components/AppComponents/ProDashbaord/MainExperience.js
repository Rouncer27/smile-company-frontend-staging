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
import putExperience from "./actions/putExperience"

import Input from "../FormFields/Input"
import TextArea from "../FormFields/Textarea"

const MainExperience = () => {
  const [state, dispatch] = useContext(UserContext)
  const { token, user, profile } = state
  const userId = user.id
  const profileId = profile && profile.id
  const [formData, setFormData] = useState({
    associated_registration_number: "",
    name_registered_with: "",
    additional_qualifications: "",
    greatest_strengths: "",
  })

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    await putExperience(token, profileId, dispatch, formData)
  }

  const updateFormFields = () => {
    setFormData({
      associated_registration_number: state.profile
        .associated_registration_number
        ? state.profile.associated_registration_number
        : "",
      name_registered_with: state.profile.name_registered_with
        ? state.profile.name_registered_with
        : "",
      additional_qualifications: state.profile.additional_qualifications
        ? state.profile.additional_qualifications
        : "",
      greatest_strengths: state.profile.greatest_strengths
        ? state.profile.greatest_strengths
        : "",
    })
  }

  const handleGetProfileOnMount = async () => {
    await getUserProfile(token, userId, state.user.confirmed, dispatch)
  }

  useEffect(() => {
    // If this person is not confirmed yet, send them back to the main dashboard. //
    if (!state.user && !state.user.confirmed)
      return navigate("/app/clinic-dashboard", { replace: true })
    handleGetProfileOnMount()
    updateFormFields()
  }, [])

  return (
    <MainExperienceStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <p>
            <span /> {state.profile && state.profile.username}
          </p>
          <h2>My Experience</h2>
        </div>
        <div className="mainForm">
          <form onSubmit={event => handleOnSubmit(event)}>
            <fieldset>
              <Input
                label="Associated Registration Number"
                name="associated_registration_number"
                type="text"
                placeholder="Associated Registration Number"
                value={formData.associated_registration_number}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
              />
              <Input
                label="Name registered with"
                name="name_registered_with"
                type="text"
                placeholder="Name registered with"
                value={formData.name_registered_with}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
              />
              <TextArea
                label="What additional qualifications do you have?"
                name="additional_qualifications"
                type="text"
                placeholder="What additional qualifications do you have?"
                value={formData.additional_qualifications}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
              />
              <TextArea
                label="What are your greatest strengths? List 3 things in bullet points"
                name="greatest_strengths"
                type="text"
                placeholder="What are your greatest strengths? List 3 things in bullet points"
                value={formData.greatest_strengths}
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
    </MainExperienceStyled>
  )
}

const MainExperienceStyled = styled.div`
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

export default MainExperience
