import { Link } from "gatsby"
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { Magic } from "magic-sdk"
import { UserContext } from "../../../context/UserContext"
import { navigate } from "gatsby"
import { B2CharcoalGrey, Btn1DarkPurple, colors } from "../../../styles/helpers"

import Input from "../FormFields/Input"

let magic

const SignUpFields = () => {
  const [state, dispatch] = useContext(UserContext)
  const [formData, setFormData] = useState({ email: "" })

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    dispatch({ type: "USER_LOADING" })

    if (formData.email === "") {
      return dispatch({
        type: "USER_ERROR",
        payload: {
          message: "Your must provide an email address.",
        },
      })
    }

    try {
      const token = await magic.auth.loginWithMagicLink({
        email: formData.email,
      })

      const reponse = await axios.post(
        `${process.env.GATSBY_API_URL}/clinic-profiles`,
        { role: "clinic" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const { user } = reponse.data
      dispatch({ type: "USER_LOGIN", payload: { token, user } })
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

  useEffect(() => {
    magic = new Magic(process.env.GATSBY_MAGIC_PK)
  }, [])

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
              required={false}
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
          Already have an account? <Link to="/app/login">Sign In</Link>
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
