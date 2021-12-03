import { Link, navigate } from "gatsby"
import queryString from "query-string"
import React, { useState, useContext, useEffect } from "react"
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

const ResetFields = props => {
  const [code, setCode] = useState("")
  const [state, dispatch] = useContext(UserContext)

  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  })

  useEffect(() => {
    const queryData = queryString.parse(props.location)
    setCode(queryData.code)
  }, [])

  const handleOnChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleOnSubmit = async event => {
    event.preventDefault()
    dispatch({ type: "USER_LOADING" })

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
        `${process.env.GATSBY_API_URL}/auth/reset-password`,
        {
          code: code,
          password: formData.password.trim(),
          passwordConfirmation: formData.password2.trim(),
        },
        {
          withCredentials: true,
        }
      )

      console.log("RESET PASSWORD RESONSE: ", response)

      const { user, token } = response.data
      dispatch({ type: "USER_LOGIN", payload: { token: token, user } })

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
    <ResetFieldsStyled>
      <div>
        <div className="mainTitle">
          <h2>Reset Your Password</h2>
        </div>
        <div className="mainForm">
          <form onSubmit={event => handleOnSubmit(event)}>
            <fieldset>
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
              </div>
            </fieldset>
          </form>
          <div className="passForgot">
            <Link to="/login">Back To Login Page</Link>
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
    </ResetFieldsStyled>
  )
}

const ResetFieldsStyled = styled.div`
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

export default ResetFields
