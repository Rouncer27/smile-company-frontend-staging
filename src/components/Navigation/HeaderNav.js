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
        <ul className="mainNav">
          {navItemsWithSubs.map(item => (
            <HeaderNavItem key={item.id} item={item} />
          ))}
        </ul>
        <ul className="appNav">
          <HeaderAppNavItems />
        </ul>
      </HeaderNavStyled>
    ) : null
  ) : null
  return headerNavigation
}

const HeaderNavStyled = styled.nav`
  display: none;
  width: 100%;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    width: calc(100%);
  }

  @media (min-width: 1200px) {
    width: calc(80%);
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-content: space-evenly;
  }

  .mainNav {
    width: calc(100%);
    margin-top: 2.5rem;
    @media (min-width: 1025px) {
      width: calc(60%);
      margin-top: 0;
    }
  }

  .appNav {
    width: calc(100%);
    margin-top: 2.5rem;

    @media (min-width: 1025px) {
      width: calc(40%);
      margin-top: 0;
    }
  }
`

export default HeaderNav
