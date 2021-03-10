import React, { useContext, useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { UserContext } from "../../../context/UserContext"
import MobileNavItem from "./MobileNavItem"
import { Nav1White, colors } from "../../../styles/helpers"

const MobileNavContainer = ({ navitems, setIsOpen }) => {
  const [state, dispatch] = useContext(UserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const topNavItems = navitems.filter(item => item.parentDatabaseId === 0)
  const subNavItems = navitems.filter(item => item.parentDatabaseId !== 0)
  const navItemsWithSubs = topNavItems.map(item => {
    const itemWithSubs = subNavItems.filter(
      subItem => subItem.parentDatabaseId === item.databaseId
    )
    item.subItems = itemWithSubs
    return item
  })

  useEffect(() => {
    if (state.token !== "") return setIsLoggedIn(true)
    return setIsLoggedIn(false)
  }, [state.token])

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" })
    navigate("/app/login", { replace: true })
    setIsOpen(false)
  }

  return (
    <MobileNavContainerStyled>
      <ul>
        {navItemsWithSubs.map(item => (
          <MobileNavItem key={item.id} item={item} />
        ))}
        {!isLoggedIn ? (
          <>
            <MobileNavItem
              item={{ label: "clinic Sign Up", url: "/dental-clinic-signup" }}
            />
            <MobileNavItem
              item={{
                label: "dental professionals",
                url: "/dental-professionals-signup",
              }}
            />
            <MobileNavItem item={{ label: "login", url: "/app/login" }} />
          </>
        ) : (
          <>
            <li className="logoutBtn">
              <Link to="/app">My Dashboard</Link>
            </li>
            <li className="logoutBtn">
              <button onClick={handleLogout} type="button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </MobileNavContainerStyled>
  )
}

const MobileNavContainerStyled = styled.nav`
  display: block;
  width: 100%;
  padding-bottom: 5rem;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    .logoutBtn {
      position: relative;
      width: 100%;
      border-bottom: 0.1rem solid ${colors.white};
      text-align: center;

      button,
      a {
        ${Nav1White};
        display: block;
        width: 100%;
        padding: 2rem;
        border: none;
        background-color: transparent;
        text-transform: uppercase;

        &:hover {
          color: ${colors.colorTertiary};
        }
      }
    }
  }
`

export default MobileNavContainer
