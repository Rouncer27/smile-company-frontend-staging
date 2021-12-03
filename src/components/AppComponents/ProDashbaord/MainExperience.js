// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getUserProfile from "./actions/getUserProfile"
import putExperience from "./actions/putExperience"
// Components
import Input from "../FormFields/Input"
import TextArea from "../FormFields/Textarea"
import RadioInput from "../FormFields/RadioInput"
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

const MainExperience = () => {
  const [needToSave, setNeedToSave] = useState(false)
  const [state, dispatch] = useContext(UserContext)
  const { user, profile, token } = state
  const userId = user.id
  const profileId = profile && profile.id
  const [formData, setFormData] = useState({
    experience: "",
    associated_registration_number: "",
    name_registered_with: "",
    additional_qualifications: "",
    greatest_strengths: "",
    clinics_worked_at: "",
    dental_software: "",
  })

  useEffect(() => {
    const shouldSave =
      formData.experience !== profile.experience
        ? true
        : formData.associated_registration_number !==
          profile.associated_registration_number
        ? true
        : formData.name_registered_with !== profile.name_registered_with
        ? true
        : formData.additional_qualifications !==
          profile.additional_qualifications
        ? true
        : formData.greatest_strengths !== profile.greatest_strengths
        ? true
        : formData.clinics_worked_at !== profile.clinics_worked_at
        ? true
        : formData.dental_software !== profile.dental_software
        ? true
        : false

    setNeedToSave(shouldSave)
  }, [formData])

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
      experience: state.profile.experience ? state.profile.experience : "",
      clinics_worked_at: state.profile.clinics_worked_at
        ? state.profile.clinics_worked_at
        : "",
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
      dental_software: state.profile.dental_software
        ? state.profile.dental_software
        : "",
    })
  }

  const handleGetProfileOnMount = async () => {
    await getUserProfile(token, userId, state.user.confirmed, dispatch)
    updateFormFields()
  }

  useEffect(() => {
    handleGetProfileOnMount()
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
        {!state.loading ? (
          <div className="mainForm">
            <form onSubmit={event => handleOnSubmit(event)}>
              <fieldset>
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
                {(state.profile && state.profile.position === "rdh") ||
                (state.profile && state.profile.position === "rda") ? (
                  <>
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
                  </>
                ) : null}
                <TextArea
                  label="Clinics Worked At"
                  name="clinics_worked_at"
                  type="text"
                  placeholder="Clinics Worked At"
                  value={formData.clinics_worked_at}
                  onChange={handleOnChange}
                  fieldvalid={true}
                  required={false}
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
                  required={false}
                  size="full"
                />
                <TextArea
                  label="What dental software do you have experience with?"
                  name="dental_software"
                  type="text"
                  placeholder="What dental software do you have experience with?"
                  value={formData.dental_software}
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
                  <button disabled={!needToSave} type="submit">
                    {profile.experience_satisfied
                      ? "Save Updated Experience"
                      : "Submit Experience"}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </MainExperienceStyled>
  )
}

const MainExperienceStyled = styled.div`
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

export default MainExperience
