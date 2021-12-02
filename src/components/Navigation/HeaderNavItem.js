import { Link } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import { colors, Nav1White } from "../../styles/helpers"

import HeaderSubMenu from "./HeaderSubMenu"

const HeaderNavItem = ({ item }) => {
  const slug = item.url
    .split("/")
    .filter(
      item =>
        item !== "" &&
        item !== "https:" &&
        item !== "webdata.smile-and-company.com"
    )
    .join("/")
  const [subActive, setSubActive] = useState(false)

  const handleIsActiveOn = () => {
    setSubActive(true)
  }

  const handleIsActiveOff = () => {
    setSubActive(false)
  }

  return (
    <HeaderNavItemStyled>
      <Link
        to={`/${slug}`}
        onMouseEnter={handleIsActiveOn}
        onMouseLeave={handleIsActiveOff}
      >
        {item.label}
      </Link>
      {item.subItems.length > 0 && (
        <HeaderSubMenu
          handleIsActiveOn={handleIsActiveOn}
          handleIsActiveOff={handleIsActiveOff}
          subActive={subActive}
          items={item.subItems}
        />
      )}
    </HeaderNavItemStyled>
  )
}

const HeaderNavItemStyled = styled.li`
  position: relative;
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
