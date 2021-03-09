import React, { useContext, useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { UserContext } from "../../context/UserContext"
import { colors, Nav1White } from "../../styles/helpers"

import DefaultUser from "../Icons/DefaultUser"

const HeaderAppNavItems = () => {
  const [state, dispatch] = useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (state.token !== "") return setIsLoggedIn(true)
    return setIsLoggedIn(false)
  }, [state.token])

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" })
    navigate("/app/login", { replace: true })
  }

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
            <Link to="/app/login">
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
            <button onClick={handleLogout} type="button">
              <span>
                <DefaultUser />
              </span>
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
  button {
    ${Nav1White};
    background-color: transparent;
    border: none;
    text-transform: uppercase;

    span {
      display: block;
      max-width: 2rem;
      margin: auto;
    }
  }
`

export default HeaderAppNavItems
