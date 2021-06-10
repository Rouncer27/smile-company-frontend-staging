import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { colors, Nav1White } from "../../../styles/helpers"

import MobileSubMenu from "./MobileSubMenu"

const MobileNavItem = ({ item }) => {
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

  const handleToggleActive = () => {
    setSubActive(!subActive)
  }
  return (
    <MobileNavItemStyled>
      <Link to={`/${slug === "home" ? "" : slug}`}>{item.label}</Link>
      {item.subItems && item.subItems.length > 0 && (
        <div className="subContainer">
          <button
            onClick={() => {
              handleToggleActive()
            }}
          >
            {subActive ? <>&#8722;</> : <>&#43;</>}
          </button>
          <MobileSubMenu subActive={subActive} items={item.subItems} />
        </div>
      )}
    </MobileNavItemStyled>
  )
}

const MobileNavItemStyled = styled.li`
  position: relative;
  width: 100%;
  border-bottom: 0.1rem solid ${colors.white};
  text-align: center;

  .subContainer {
    width: 100%;
    height: 100%;

    button {
      position: absolute;
      top: 0;
      right: 0;
      width: 6.3rem;
      height: 6.3rem;
      font-size: 3rem;
      font-weight: bold;
      z-index: 150;

      &:hover {
        cursor: pointer;
      }
    }
  }

  a {
    ${Nav1White};
    display: block;
    width: 100%;
    padding: 2rem;
    text-transform: uppercase;

    &:hover {
      color: ${colors.colorTertiary};
    }

    &[aria-current="page"] {
      background-color: rgba(173, 137, 166, 0.5);

      &:hover {
        color: ${colors.white};
        cursor: default;
      }
    }
  }
`

export default MobileNavItem
