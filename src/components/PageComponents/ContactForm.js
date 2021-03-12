import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  Btn1DarkPurple,
  colors,
  Btn1LightSage,
  B2White,
  H2White,
  medWrapper,
  H1DarkPurple,
} from "../../styles/helpers"

import Input from "../FormParts/Input"
import Textarea from "../FormParts/Textarea"

const ContactForm = ({ data }) => {
  const { formFields } = data
  const [formData, setFormData] = useState({})

  const displaySidebar = data.sidebarDispaly

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
    <ContactFormStyled sidebar={displaySidebar}>
      <div className="wrapper">
        <form onSubmit={handleOnSubmit}>
          {data.formMainTitle && (
            <div className="mainFormTitle">
              <h2>{data.formMainTitle}</h2>
            </div>
          )}
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
