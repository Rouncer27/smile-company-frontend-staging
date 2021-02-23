import { Link } from "gatsby"
import React, { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import { UserContext } from "../../../context/UserContext"
import { navigate } from "gatsby"
import { B2CharcoalGrey, Btn1DarkPurple, colors } from "../../../styles/helpers"

import Input from "../FormFields/Input"

const SignUpFields = () => {
  const [state, dispatch] = useContext(UserContext)
  const [formData, setFormData] = useState({
    clinicname: "",
    username: "",
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

  const handleOnSubmit = async event => {
    event.preventDefault()
    dispatch({ type: "USER_LOADING" })
    try {
      const reponse = await axios.post(
        `${process.env.GATSBY_API_URL}/auth/local/register/clinic`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      )

      const { user, token } = reponse.data
      dispatch({ type: "USER_LOGIN", payload: { token, user } })
      navigate("/app/clinic-dashboard", { replace: true })
    } catch (err) {
      console.log(err)
      dispatch({ type: "USER_ERROR" })
    }
  }
  return (
    <SignUpFieldsStyled>
      <div className="mainForm">
        <form onSubmit={event => handleOnSubmit(event)}>
          <fieldset>
            <Input
              label="account username"
              name="username"
              type="text"
              placeholder="account username"
              value={formData.username}
              onChange={handleOnChange}
              fieldvalid={true}
              required={false}
              size="full"
            />
            <Input
              label="email"
              name="email"
              type="email"
              placeholder="email"
              value={formData.email}
              onChange={handleOnChange}
              fieldvalid={true}
              required={false}
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
              required={false}
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
              required={false}
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
          Are you looking for temporary work?{" "}
          <Link to="/dental-professionals-signup">Sign Up Here.</Link>
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
