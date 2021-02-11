import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const MobileSubMenuItem = ({ item }) => {
  return (
    <MobileSubMenuItemStyled>
      <Link to="/">{item.label}</Link>
    </MobileSubMenuItemStyled>
  )
}

const MobileSubMenuItemStyled = styled.li`
  width: 100%;
  text-align: center;

  a {
    padding: 1.5rem 2rem !important;
  }
`

export default MobileSubMenuItem
