import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { colors, Nav1White } from "../../styles/helpers"

const HeaderNavItem = ({ item }) => {
  return (
    <HeaderNavItemStyled>
      <Link to={item.url}>{item.label}</Link>
    </HeaderNavItemStyled>
  )
}

const HeaderNavItemStyled = styled.li`
  align-self: center;
  a {
    ${Nav1White};
    padding: 1rem;
    border-radius: 0.3rem;
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

export default HeaderNavItem
