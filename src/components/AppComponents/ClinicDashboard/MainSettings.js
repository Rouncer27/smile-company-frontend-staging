import React, { useState } from "react"
import styled from "styled-components"
import axios from "axios"

import { colors, Btn1DarkPurple, H1DarkPurple } from "../../../styles/helpers"

import Input from "../FormFields/Input"

const MainSettings = () => {
  const [formData, setFormData] = useState({
    clinicName: "",
    contactFirstName: "",
    contactLastName: "",
    phone: "",
    textMessage: "",
    parking: "",
    additionalClinics: "",
    dentistsCount: "",
    dentistsNames: "",
    officeHours: "",
    benefits: "",
    perks: "",
    bestThing: "",
  })

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    console.log("Submit the login")
  }

  return (
    <MainSettingsStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <h2>Clinic Settings</h2>
        </div>
        <div className="mainForm">
          <form onSubmit={event => handleOnSubmit(event)}>
            <fieldset>
              <Input
                label="clinic name"
                name="clinicName"
                type="text"
                placeholder="clinic name"
                value={formData.clinicName}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="contact first name"
                name="contactFirstName"
                type="text"
                placeholder="contact first name"
                value={formData.contactFirstName}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="half"
              />
              <Input
                label="contact last name"
                name="contactLastName"
                type="text"
                placeholder="contact last name"
                value={formData.contactLastName}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="half"
              />
              <Input
                label="phone number"
                name="phone"
                type="text"
                placeholder="phone number"
                value={formData.phone}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="half"
              />
              <Input
                label="text message number"
                name="textMessage"
                type="text"
                placeholder="text message number"
                value={formData.textMessage}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="parking information"
                name="parking"
                type="text"
                placeholder="parking information"
                value={formData.parking}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="Do you have additional clinics that you want to add to this account"
                name="additionalClinics"
                type="text"
                placeholder="additional clinics"
                value={formData.additionalClinics}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="How many dentists are in your clinic?"
                name="dentistsCount"
                type="text"
                placeholder="How many dentists"
                value={formData.dentistsCount}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="What are the dentists names?"
                name="dentistsNames"
                type="text"
                placeholder="names"
                value={formData.dentistsNames}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="What are your office hours?"
                name="officeHours"
                type="text"
                placeholder="office hours"
                value={formData.officeHours}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="Do you offer benefits?"
                name="benefits"
                type="text"
                placeholder="benefits"
                value={formData.benefits}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="What perks does your clinic have that sets you apart from other dental clinics?"
                name="perks"
                type="text"
                placeholder="perks"
                value={formData.perks}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <Input
                label="Bonus: What is the best thing about working at your office?"
                name="bestThing"
                type="text"
                placeholder="best thing about working at your office"
                value={formData.bestThing}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              <div className="submitButton">
                <button type="submit">Save Profile</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </MainSettingsStyled>
  )
}

const MainSettingsStyled = styled.div`
  align-self: stretch;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    width: calc(70vw);
  }

  .dashWrap {
    width: calc(100% - 5rem);
    max-width: 75rem;
    margin-left: 5rem;
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .dashTitle {
    h2 {
      ${H1DarkPurple};
    }
  }

  .mainForm {
    width: 100%;
    max-width: 55rem;
    margin: 0;
    margin-bottom: 2.5rem;
    padding-bottom: 5rem;

    fieldset {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      border: none;

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

export default MainSettings
