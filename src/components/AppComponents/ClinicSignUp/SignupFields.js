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
    email: "",
    password: "",
    password2: "",
  })

  const resetFormData = () => {
    setFormData({
      email: "",
      password: "",
      password2: "",
    })
  }

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    dispatch({ type: "USER_LOADING" })

    // * Validate Email * //
    if (formData.email === "") {
      return dispatch({
        type: "USER_ERROR",
        payload: {
          message: "Your must provide an email address.",
        },
      })
    }

    // * Validate Password length * //
    if (
      formData.password.trim().length <= 5 ||
      formData.password.trim().length >= 31
    ) {
      return dispatch({
        type: "USER_ERROR",
        payload: {
          message:
            "Your must provide an password of 6 or more characters and no more than 30 characters.",
        },
      })
    }

    // * Validate Password match * //
    if (formData.password.trim() !== formData.password2.trim()) {
      return dispatch({
        type: "USER_ERROR",
        payload: {
          message: "Your passwords do not match!",
        },
      })
    }

    try {
      const response = await axios.post(
        `${process.env.GATSBY_API_URL}/auth/local/register`,
        {
          email: formData.email,
          username: formData.email,
          password: formData.password.trim(),
        },
        {
          withCredentials: true,
        }
      )

      // TODO: Something went wrong here.
      if (response.data.ok) {
        resetFormData()
      }

      const reponse = await axios.post(
        `${process.env.GATSBY_API_URL}/clinic-profiles`,
        { role: "clinic" },
        {
          withCredentials: true,
        }
      )

      const { user } = reponse.data
      dispatch({ type: "USER_LOGIN", payload: { user } })
      navigate("/app/clinic-dashboard", { replace: true })
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
    <SignUpFieldsStyled>
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
            <Input
              label="confirm password"
              name="password2"
              type="password"
              placeholder="confirm password"
              value={formData.password2}
              onChange={handleOnChange}
              fieldvalid={true}
              required={true}
              size="full"
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
