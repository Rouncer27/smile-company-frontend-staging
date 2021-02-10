import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import HeaderNavItem from "./HeaderNavItem"
import HeaderAppNavItems from "./HeaderAppNavItems"

const getData = graphql`
  {
    headerMenu: wpMenu(name: { eq: "Header Menu" }) {
      name
      menuItems {
        nodes {
          label
          url
          parentDatabaseId
          parentId
          id
          databaseId
        }
      }
    }
  }
`

const HeaderNav = () => {
  const data = useStaticQuery(getData)
  const { headerMenu } = data
  const allNavItems = headerMenu.menuItems.nodes
  const navItems = allNavItems.filter(item => item.parentDatabaseId === 0)
  const subItems = allNavItems.filter(item => item.parentDatabaseId !== 0)
  const navItemsWithSubs = navItems.map(item => {
    const itemWithSubs = subItems.filter(
      subItem => subItem.parentDatabaseId === item.databaseId
    )
    item.subItems = itemWithSubs
    return item
  })
  const headerNavigation = navItems ? (
    navItemsWithSubs.length > 0 ? (
      <HeaderNavStyled>
        <ul>
          {navItemsWithSubs.map(item => (
            <HeaderNavItem key={item.id} item={item} />
          ))}
          <HeaderAppNavItems />
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
    align-items: center;
    justify-content: space-between;
    justify-content: space-evenly;
  }
`

export default HeaderNav
