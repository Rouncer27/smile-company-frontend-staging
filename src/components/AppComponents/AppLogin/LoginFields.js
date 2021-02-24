import { Link, navigate } from "gatsby"
import React, { useState, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import { UserContext } from "../../../context/UserContext"

import {
  B2CharcoalGrey,
  Btn1DarkPurple,
  colors,
  H4Lavender,
} from "../../../styles/helpers"

import Input from "../FormFields/Input"

const LoginFields = () => {
  const [state, dispatch] = useContext(UserContext)

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

  const handleOnSubmit = async event => {
    event.preventDefault()
    dispatch({ type: "USER_LOADING" })
    try {
      const { data } = await axios.post(
        `${process.env.GATSBY_API_URL}/auth/local`,
        {
          identifier: formData.email,
          password: formData.password,
        }
      )

      const { user, token } = data
      dispatch({ type: "USER_LOGIN", payload: { token, user } })

      if (user.role.type === "dental_clinics") {
        navigate("/app/clinic-dashboard", { replace: true })
      } else {
        navigate("/app/professional-dashboard", { replace: true })
      }
    } catch (err) {
      console.log(err)
      const message =
        err.response.data &&
        err.response.data.message &&
        err.response.data.message[0] &&
        err.response.data.message[0].messages[0] &&
        err.response.data.message[0].messages[0].message
      dispatch({ type: "USER_ERROR", payload: { message } })
    }
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
                label="email / username"
                name="email"
                type="text"
                placeholder="email / username"
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
                size="full"
              />
              <div className="submitButton">
                <button type="submit">Submit</button>
              </div>
            </fieldset>
          </form>
          <div className="passForgot">
            <Link to="/app/forgot">Forgot your password?</Link>
          </div>
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
