import { Link, navigate } from "gatsby"
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import { Magic } from "magic-sdk"
import { UserContext } from "../../../context/UserContext"

import {
  B2CharcoalGrey,
  Btn1DarkPurple,
  colors,
  H4Lavender,
} from "../../../styles/helpers"

import Input from "../FormFields/Input"
let magic

const LoginFields = () => {
  const [state, dispatch] = useContext(UserContext)

  const [formData, setFormData] = useState({
    email: "",
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

      const response = await axios.get(
        `${process.env.GATSBY_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const user = response.data
      console.log(user)

      if (user.role.type === "dental_clinics") {
        const profile = user.clinic_profile
        dispatch({ type: "USER_LOGIN", payload: { token, user, profile } })
        navigate("/app/clinic-dashboard", { replace: true })
      } else if (user.role.type === "dental_professionals") {
        const profile = user.professional_profile
        dispatch({ type: "USER_LOGIN", payload: { token, user, profile } })
        navigate("/app/professional-dashboard", { replace: true })
      } else if (user.role.type === "authenticated") {
        dispatch({
          type: "USER_ERROR",
          payload: {
            message:
              "No user found. You need to setup an account before logging in to the app. Pick either Denatl Professionals or Denatal Clinic account. Thank you.",
          },
        })
      } else {
        dispatch({
          type: "USER_ERROR",
          payload: { message: "Something went wrong, please try again later." },
        })
      }
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
                type="text"
                placeholder="email"
                value={formData.email}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              />
              {/* <Input
                label="password"
                name="password"
                type="password"
                placeholder="password"
                value={formData.password}
                onChange={handleOnChange}
                fieldvalid={true}
                required={false}
                size="full"
              /> */}
              <div className="submitButton">
                <button type="submit">Submit</button>
              </div>
            </fieldset>
          </form>
          {/* <div className="passForgot">
            <Link to="/app/forgot">Forgot your password?</Link>
          </div> */}
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

  .passForgot {
    margin-top: 2.5rem;
    padding-left: 2rem;

    a {
      ${B2CharcoalGrey};
      margin: 0;
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

export default LoginFields
