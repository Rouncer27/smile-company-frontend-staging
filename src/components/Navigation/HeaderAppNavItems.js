import React, { useContext, useState, useEffect } from "react"
import axios from "axios"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { UserContext } from "../../context/UserContext"
import { colors, Nav1White } from "../../styles/helpers"

import DefaultUser from "../Icons/DefaultUser"

const HeaderAppNavItems = () => {
  const [state, dispatch] = useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (state.user.id) return setIsLoggedIn(true)
    return setIsLoggedIn(false)
  }, [state.user.id])

  const handleLogout = async () => {
    dispatch({ type: "USER_LOADING" })
    try {
      await axios.post(
        `${process.env.GATSBY_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      )

      dispatch({ type: "USER_LOGOUT" })
      dispatch({
        type: "USER_ALERT",
        payload: { messgae: "You have been logged out of your account." },
      })
    } catch (err) {
      console.dir(err)
    }

    navigate("/login", { replace: true })
  }

  const dashboard =
    state &&
    state.user &&
    state.user.role &&
    state.user.role.id === process.env.GATSBY_PROFESSIONAL_ID
      ? "professional-dashboard"
      : state &&
        state.user &&
        state.user.role &&
        state.user.role.id === process.env.GATSBY_CLINIC_ID
      ? "clinic-dashboard"
      : "login"

  return (
    <>
      {!isLoggedIn ? (
        <>
          <AppItemOne>
            <Link to="/dental-clinic-signup">Clinic Sign Up</Link>
          </AppItemOne>
          <AppItemOne>
            <Link to="/dental-professionals-signup">Dental Professionals</Link>
          </AppItemOne>
          <AppItemTwo>
            <Link to="/login">
              <span>
                <DefaultUser />
              </span>
              Login
            </Link>
          </AppItemTwo>
        </>
      ) : (
        <>
          <AppItemThree>
            <Link to={`/app/${dashboard}`}>My Dashboard</Link>
          </AppItemThree>
          <AppItemThree>
            <button onClick={handleLogout} type="button">
              LogOut
            </button>
          </AppItemThree>
        </>
      )}
    </>
  )
}

const AppItemOne = styled.li`
  align-self: center;
  a {
    ${Nav1White};
    padding: 1rem;
    border-radius: 0.6rem;
    border: solid 0.1rem ${colors.white};
    text-transform: uppercase;

    &[aria-current="page"] {
      background-color: rgba(173, 137, 166, 0.5);

      &:hover {
        color: ${colors.white};
        cursor: default;
      }
    }
  }
`

const AppItemTwo = styled.li`
  align-self: center;
  a {
    ${Nav1White};
    text-transform: uppercase;

    span {
      display: block;
      max-width: 2rem;
      margin: auto;
    }
  }
`

const AppItemThree = styled.li`
  align-self: center;
  button,
  a {
    ${Nav1White};
    padding: 1rem;
    border-radius: 0.6rem;
    border: solid 0.1rem ${colors.white};
    text-transform: uppercase;

    &[aria-current="page"] {
      background-color: rgba(173, 137, 166, 0.5);

      &:hover {
        color: ${colors.white};
        cursor: default;
      }
    }
  }

  button {
    background-color: transparent;
  }
`

export default HeaderAppNavItems
