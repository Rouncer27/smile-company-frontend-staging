import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import axios from "axios"
import styled from "styled-components"
import {
  Btn1DarkPurple,
  colors,
  Btn1LightSage,
  B2White,
  H2White,
  medWrapper,
  H1DarkPurple,
  Nav1Lavender,
  Nav1CharcoalGrey,
} from "../../styles/helpers"

import Input from "../FormParts/Input"
import Textarea from "../FormParts/Textarea"
import CheckBoxInput from "../FormParts/CheckBoxInput"

import FormSuccess from "../UiElements/formModals/FormSuccess"
import FormSubmit from "../UiElements/formModals/FormSubmit"
import FormErrors from "../UiElements/formModals/FormErrors"

const ContactForm = ({ data }) => {
  const { formFields } = data
  const [formData, setFormData] = useState({})
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    errorWarnDisplay: false,
    success: false,
    errors: [],
  })

  const { mustReadTerms } = data
  const displaySidebar = data.sidebarDispaly

  useEffect(() => {
    const startingState = {}
    data.formFields.forEach(field => {
      if (field.type !== "checkbox") {
        return (startingState[field.id] = "")
      }
    })
    setFormData({ ...formData, ...startingState })
  }, [])

  const handleOnCheckboxChange = event => {
    if (!formData[event.target.name]) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      })
    } else {
      const formCopy = formData
      delete formCopy[event.target.name]

      setFormData({
        ...formCopy,
      })
    }
  }

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const submitToWebServer = async (formID, data) => {
    const FORM_POST_URL = `https://dedi105.canspace.ca/~smileswbusercom/wp-json/contact-form-7/v1/contact-forms/${formID}/feedback`
    const config = { headers: { "Content-Type": "multipart/form-data" } }
    const serverResponse = await axios.post(FORM_POST_URL, data, config)

    if (serverResponse.data.status === "mail_sent") {
      return { errors: false, errorMessages: [] }
    } else {
      return { errors: true, errorMessages: serverResponse.data.invalid_fields }
    }
  }

  const handleOnSubmit = async e => {
    e.preventDefault()
    setFormStatus({
      ...formStatus,
      submitting: true,
    })

    const formDataArray = Object.entries(formData)
    const bodyFormData = new FormData()
    formDataArray.forEach(field => {
      bodyFormData.append(field[0], field[1])
    })

    const response = await submitToWebServer(data.formId, bodyFormData)

    handleUpdateServerResponse(response)
  }

  const handleUpdateServerResponse = response => {
    if (!response.errors) {
      setFormStatus({
        ...formStatus,
        submitting: false,
        errorWarnDisplay: false,
        success: true,
        errors: [],
      })
    } else {
      setFormStatus({
        ...formStatus,
        submitting: false,
        errorWarnDisplay: true,
        success: false,
        errors: response.errorMessages,
      })
    }
  }

  const handleErrorModalClose = () => {
    setFormStatus({
      ...formStatus,
      submitting: false,
      errorWarnDisplay: false,
      success: false,
    })
  }

  const handleSuccessModalClose = () => {
    setFormStatus({
      ...formStatus,
      submitting: false,
      errorWarnDisplay: false,
      success: false,
      errors: [],
    })

    const resetFields = {}
    for (const key in formData) {
      resetFields[`${key}`] = ""
    }

    setFormData({ ...resetFields })
  }

  console.log("FORM FEILDS: ", formData)
  console.log(mustReadTerms)

  return (
    <ContactFormStyled sidebar={displaySidebar}>
      <div className="wrapper">
        <form onSubmit={e => handleOnSubmit(e)}>
          {data.formMainTitle && (
            <div className="mainFormTitle">
              <h2>{data.formMainTitle}</h2>
            </div>
          )}
          <fieldset>
            {formFields.map(field => {
              const {
                id,
                type,
                label,
                placeholder,
                required,
                size,
                options,
              } = field
              const errorMessage = formStatus.errors.find(
                error => error.idref === id
              )

              let formField
              if (type === "text" || type === "email") {
                formField = (
                  <Input
                    key={id}
                    label={label}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    value={formData[id] ? formData[id] : ""}
                    onChange={handleOnChange}
                    fieldvalid={true}
                    size={size}
                    required={required}
                    error={errorMessage ? errorMessage.message : ""}
                  />
                )
              } else if (type === "textarea") {
                formField = (
                  <Textarea
                    key={id}
                    label={label}
                    name={id}
                    placeholder={placeholder}
                    value={formData[id] ? formData[id] : ""}
                    onChange={handleOnChange}
                    size={size}
                    required={required}
                    error={errorMessage ? errorMessage.message : ""}
                  />
                )
              } else if (type === "checkbox") {
                formField = (
                  <CheckBoxInput
                    name={id}
                    label={label}
                    options={options}
                    onChange={handleOnCheckboxChange}
                    thisCheckValue={formData[id]}
                  />
                )
              }
              return formField
            })}
            {mustReadTerms && (
              <div className="termsConditions">
                <p>
                  You must read and agree to our terms and conditions. Here are
                  our{" "}
                  <a target="_blank" href="/terms-and-conditions">
                    Terms and Conditions
                  </a>
                </p>
              </div>
            )}
            <div className="submitButton">
              <button type="submit">Submit</button>
            </div>
          </fieldset>
        </form>

        {displaySidebar && (
          <FormSidebar className="postingSidebar">
            <div className="postingSidebar__title">
              <h3>{data.sidebarTitle}</h3>
            </div>
            <div
              className="postingSidebar__content"
              dangerouslySetInnerHTML={{ __html: data.sidebarContent }}
            />
            <div className="postingSidebar__link">
              <Link to={`/${data.sidebarButtonSlug}`}>
                {data.sidebarButtonText}
              </Link>
            </div>
          </FormSidebar>
        )}
      </div>
      <FormSubmit isActive={formStatus.submitting} />
      <FormSuccess
        isActive={formStatus.success}
        handleClose={handleSuccessModalClose}
      />
      <FormErrors
        isActive={formStatus.errorWarnDisplay}
        handleClose={handleErrorModalClose}
      />
    </ContactFormStyled>
  )
}

const ContactFormStyled = styled.div`
  .wrapper {
    ${medWrapper};
    flex-direction: row-reverse;
  }

  form {
    width: 100%;
    margin-bottom: 2.5rem;

    @media (min-width: 768px) {
      width: calc(66.66%);
      margin-bottom: 0;
    }

    @media (min-width: 1025px) {
      width: calc(60%);
    }

    .mainFormTitle {
      text-align: center;
      h2 {
        ${H1DarkPurple};
        margin: 0;
      }
    }
  }

  fieldset {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    justify-content: space-evenly;
    border: none;
    outline: none;
    width: 100%;
  }

  .termsConditions {
    width: 100%;
    padding-left: 0.5rem;

    p {
      ${Nav1CharcoalGrey};

      &:hover {
        color: ${colors.colorAlt};
        cursor: inherit;
      }
    }

    a {
      ${Nav1CharcoalGrey};
      text-decoration: underline;
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
`

const FormSidebar = styled.div`
  align-self: flex-start;
  width: calc(100%);
  padding: 4rem;
  background-color: ${colors.colorTertiary};

  @media (min-width: 768px) {
    width: calc(33.33% - 2rem);
    margin-right: 2rem;
  }

  @media (min-width: 1025px) {
    width: calc(40% - 2rem);
    margin-right: 2rem;
  }

  .postingSidebar__title {
    h3 {
      ${H2White};
    }
  }

  .postingSidebar__content {
    p {
      ${B2White};
    }
  }

  .postingSidebar__link {
    a {
      ${Btn1LightSage};
    }
  }
`

export default ContactForm
