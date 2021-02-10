import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { colors, Nav1White } from "../../styles/helpers"

import DefaultUser from "../Icons/DefaultUser"

const HeaderAppNavItems = () => {
  return (
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

export default HeaderAppNavItems
