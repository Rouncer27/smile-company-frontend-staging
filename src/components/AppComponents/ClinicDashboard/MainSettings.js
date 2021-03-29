// NPM Packages
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { navigate } from "gatsby"
// Context
import { UserContext } from "../../../context/UserContext"
// Actions
import getProfile from "./actions/getProfile"
// Common styles
import mainSection from "./styles/mainSection"
import dashWrap from "./styles/dashWrap"
import dashTitle from "./styles/dashTitle"
import { Btn1DarkPurple } from "../../../styles/helpers"
// Components
import Input from "../FormFields/Input"

const MainSettings = () => {
  const [state, dispatch] = useContext(UserContext)
  const token = state.token
  const userId = state.user._id
  const profileId = state.profile && state.profile.id

  const [formData, setFormData] = useState({
    clinicName: "",
    contactFirstName: "",
    contactLastName: "",
    phone: "",
    textMessage: "",
    address: "",
    city: "",
    parking: "",
    additionalClinics: "",
    dentistsCount: "",
    dentistsNames: "",
    officeHours: "",
  })

  const updateFormFields = () => {
    setFormData({
      clinicName: state.profile.clinic_name ? state.profile.clinic_name : "",
      contactFirstName: state.profile.contact_first_name
        ? state.profile.contact_first_name
        : "",
      contactLastName: state.profile.contact_last_name
        ? state.profile.contact_last_name
        : "",
      phone: state.profile.phone ? state.profile.phone : "",
      textMessage: state.profile.text_message_number
        ? state.profile.text_message_number
        : "",
      address: state.profile.address ? state.profile.address : "",
      city: state.profile.city ? state.profile.city : "",
      parking: state.profile.parking_information
        ? state.profile.parking_information
        : "",
      additionalClinics: state.profile.additional_clinics
        ? state.profile.additional_clinics
        : "",
      dentistsCount: state.profile.dentists_count
        ? state.profile.dentists_count
        : "",
      dentistsNames: state.profile.dentists_names
        ? state.profile.dentists_names
        : "",
      officeHours: state.profile.office_hours ? state.profile.office_hours : "",
    })
  }

  const handleGetProfileOnMount = async () => {
    await getProfile(token, userId, dispatch)
    updateFormFields()
  }

  useEffect(() => {
    // If this person is not confirmed yet, send them back to the main dashboard. //
    if (!state.user.confirmed)
      return navigate("/app/clinic-dashboard", { replace: true })

    handleGetProfileOnMount()
  }, [])

  const isAllFieldsComplete = () => {
    if (formData.clinicName.trim() === "") {
      return { goToSend: false, message: "Clinic Name" }
    }
    if (formData.contactFirstName.trim() === "") {
      return { goToSend: false, message: "Contact First Name" }
    }
    if (formData.contactLastName.trim() === "") {
      return { goToSend: false, message: "Contact Last Name" }
    }
    if (formData.phone.trim() === "") {
      return { goToSend: false, message: "Phone Number" }
    }
    if (formData.textMessage.trim() === "") {
      return { goToSend: false, message: "Text Message Number" }
    }
    if (formData.address.trim() === "") {
      return { goToSend: false, message: "Clinic Address" }
    }
    if (formData.city.trim() === "") {
      return { goToSend: false, message: "Clinic City Location" }
    }
    if (formData.parking.trim() === "") {
      return { goToSend: false, message: "Parking Details" }
    }
    if (formData.additionalClinics.trim() === "") {
      return { goToSend: false, message: "Additional Clinic Information" }
    }
    if (formData.dentistsCount.trim() === "") {
      return { goToSend: false, message: "Number of Dentists" }
    }
    if (formData.dentistsNames.trim() === "") {
      return { goToSend: false, message: "Dentist Names" }
    }
    if (formData.officeHours.trim() === "") {
      return { goToSend: false, message: "Office Hours" }
    }

    return { goToSend: true, message: "" }
  }

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    if (!profileId) return
    dispatch({ type: "USER_LOADING" })
    const { goToSend, message } = isAllFieldsComplete()

    if (!goToSend)
      return dispatch({
        type: "USER_ERROR",
        payload: {
          message: `You are missing some feilds. All fields must be filled out in order to complet your profile. ${message} is required.`,
        },
      })

    try {
      const response = await axios.put(
        `${process.env.GATSBY_API_URL}/clinic-profiles/${profileId}`,
        {
          clinic_name: formData.clinicName,
          contact_first_name: formData.contactFirstName,
          contact_last_name: formData.contactLastName,
          phone: formData.phone,
          text_message_number: formData.textMessage,
          address: formData.address,
          city: formData.city,
          parking_information: formData.parking,
          additional_clinics: formData.additionalClinics,
          dentists_count: formData.dentistsCount,
          dentists_names: formData.dentistsNames,
          office_hours: formData.officeHours,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({
        type: "USER_UPDATE_PROFILE",
        payload: {
          profile: response.data,
          message: "Your profile has been updated successfully!",
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

  return (
    <MainSettingsStyled>
      <div className="dashWrap">
        <div className="dashTitle">
          <h2>Clinic Details</h2>
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
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
                size="half"
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
              <Input
                label="city"
                name="city"
                type="text"
                placeholder="city"
                value={formData.city}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
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
                required={true}
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
