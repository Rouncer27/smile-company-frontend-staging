import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import HeaderNavItem from "./HeaderNavItem"

const getData = graphql`
  {
    headerMenu: wpMenu(name: { eq: "Header Menu" }) {
      name
      menuItems {
        nodes {
          id
          label
          url
        }
      }
    }
  }
`

const HeaderNav = () => {
  const data = useStaticQuery(getData)
  const { headerMenu } = data
  const navItems = headerMenu.menuItems.nodes
  const headerNavigation = navItems ? (
    navItems.length > 0 ? (
      <HeaderNavStyled>
        <ul>
          {navItems.map(item => (
            <HeaderNavItem key={item.id} item={item} />
          ))}
        </ul>
      </HeaderNavStyled>
    ) : null
  ) : null
  return headerNavigation
}

const HeaderNavStyled = styled.nav`
  width: 100%;

  @media (min-width: 768px) {
    width: calc(80%);
  }

  ul {
    display: flex;
    justify-content: space-between;
    justify-content: space-evenly;
  }
`

export default HeaderNav
