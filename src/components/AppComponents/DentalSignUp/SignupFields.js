import { Link } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import {
  B2CharcoalGrey,
  Btn1DarkPurple,
  colors,
  H4Lavender,
} from "../../../styles/helpers"

import Input from "../FormFields/Input"

const SignUpFields = () => {
  const [formData, setFormData] = useState({
    contactFirstName: "",
    contactLastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = event => {
    event.preventDefault()
    console.log("Submit the login")
  }
  return (
    <SignUpFieldsStyled>
      <div className="mainForm">
        <form onSubmit={event => handleOnSubmit(event)}>
          <fieldset>
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
              label="email"
              name="email"
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={handleOnChange}
              fieldvalid={true}
              required={true}
              size="half"
            />
            <Input
              label="password"
              name="password"
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={handleOnChange}
              fieldvalid={true}
              required={true}
              size="half"
            />
            <Input
              label="confirm password"
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              fieldvalid={true}
              required={true}
              size="half"
            />
            <div className="submitButton">
              <button type="submit">Submit</button>
              <p>
                By signing up you agree to our{" "}
                <Link to="/privacy-policy">
                  terms of use and privacy policy.
                </Link>
              </p>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="mainNav">
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        <p>
          Are you a clinic looking to register?{" "}
          <Link to="/dental-clinic-signup">Sign Up Here.</Link>
        </p>
      </div>
    </SignUpFieldsStyled>
  )
}

const SignUpFieldsStyled = styled.div`
  .mainForm {
    width: 100%;
    max-width: 55rem;
    margin: 0;
    margin-bottom: 2.5rem;
    padding-bottom: 2.5rem;
    border-bottom: solid 0.5rem ${colors.colorTertiary};

    fieldset {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border: none;

      .submitButton {
        width: 100%;
        padding-top: 3rem;
        padding-left: 0.5rem;

        button {
          ${Btn1DarkPurple};
        }

        p {
          ${B2CharcoalGrey};
          margin: 0;
          margin-top: 2.5rem;

          a {
            ${B2CharcoalGrey};
            margin: 0;
            text-decoration: underline;

            &:hover {
              color: ${colors.colorPrimary};
            }
          }
        }
      }
    }
  }

  .mainNav {
    padding-left: 2rem;

    p,
    a {
      ${B2CharcoalGrey};
      margin: 0;
    }

    a {
      text-decoration: underline;
    }

    a:hover {
      color: ${colors.colorPrimary};
    }
  }
`

export default SignUpFields
