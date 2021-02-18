import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Btn1DarkPurple } from "../../styles/helpers"

import Input from "../FormParts/Input"
import Textarea from "../FormParts/Textarea"

const ContactForm = ({ data }) => {
  const { formFields } = data
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const startingState = {}
    data.formFields.forEach(field => (startingState[field.id] = ""))
    setFormData({ ...formData, ...startingState })
  }, [])

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = () => {
    console.log("Submitting the form!")
  }

  return (
    <ContactFormStyled>
      <div className="wrapper">
        <form onSubmit={handleOnSubmit}>
          <fieldset>
            {formFields.map(field => {
              const { id, type, label, placeholder, required, size } = field
              let formField
              if (type === "text" || type === "email") {
                formField = (
                  <Input
                    label={label}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    value={formData[id]}
                    onChange={handleOnChange}
                    fieldvalid={true}
                    size={size}
                    required={true}
                  />
                )
              } else if (type === "textarea") {
                formField = (
                  <Textarea
                    label={label}
                    name={id}
                    placeholder={placeholder}
                    value={formData[id]}
                    onChange={handleOnChange}
                    fieldvalid={true}
                    size={size}
                    required={true}
                  />
                )
              }
              return formField
            })}
            <div className="submitButton">
              <button type="submit">Submit</button>
            </div>
          </fieldset>
        </form>
      </div>
    </ContactFormStyled>
  )
}

const ContactFormStyled = styled.div`
  .wrapper {
    width: 100%;
    margin: 2rem auto;
    padding: 2rem;

    @media (min-width: 768px) {
      max-width: 60rem;
    }

    @media (min-width: 1025px) {
      max-width: 60rem;
    }
  }

  form {
    width: 100%;
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

  .submitButton {
    width: 100%;
    padding-top: 3rem;
    padding-left: 0.5rem;

    button {
      ${Btn1DarkPurple};
    }
  }
`

export default ContactForm
