import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { colors, Nav1White } from "../../styles/helpers"

const HeaderSubMenuItem = ({ item }) => {
  const slug = item.url
    .split("/")
    .filter(item => item !== "")
    .join("/")
  return (
    <HeaderSubMenuItemStyled>
      <Link to={`/${slug}`}>{item.label}</Link>
    </HeaderSubMenuItemStyled>
  )
}

const HeaderSubMenuItemStyled = styled.li`
  a {
    ${Nav1White};
    width: 100%;
    text-align: center;

    &:hover {
      color: ${colors.colorPrimary} !important;
    }
  }
`

export default HeaderSubMenuItem
