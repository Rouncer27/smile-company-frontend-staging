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

const LoginFields = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    <LoginFieldsStyled>
      <div>
        <div className="mainTitle">
          <h2>Login to your account</h2>
        </div>
        <div className="mainForm">
          <form onSubmit={event => handleOnSubmit(event)}>
            <fieldset>
              <Input
                label="email"
                name="email"
                type="email"
                placeholder="email"
                value={formData.email}
                onChange={handleOnChange}
                fieldvalid={true}
                required={true}
                size="full"
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
                size="full"
              />
              <div className="submitButton">
                <button type="submit">Submit</button>
              </div>
            </fieldset>
          </form>
        </div>
        <div className="mainNav">
          <p>
            Are you a clinic looking to register?{" "}
            <Link to="/dental-clinic-signup">Sign Up Here.</Link>
          </p>
          <p>
            Do you need an account and you are looking for temp opportunities?{" "}
            <Link to="/dental-professionals-signup">Sign Up Here.</Link>
          </p>
        </div>
      </div>
    </LoginFieldsStyled>
  )
}

const LoginFieldsStyled = styled.div`
  .mainTitle {
    h2 {
      ${H4Lavender};
    }
  }

  .mainForm {
    width: 100%;
    max-width: 55rem;
    margin: 0;
    margin-bottom: 2.5rem;
    padding-bottom: 5rem;
    border-bottom: solid 0.5rem ${colors.colorTertiary};

    fieldset {
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

  .mainNav {
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

export default LoginFields
