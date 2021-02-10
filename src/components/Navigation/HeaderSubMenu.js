import React from "react"
import styled from "styled-components"
import { colors } from "../../styles/helpers"
import HeaderSubMenuItem from "./HeaderSubMenuItem"

const HeaderSubMenu = ({
  subActive,
  items,
  handleIsActiveOn,
  handleIsActiveOff,
}) => {
  console.log("items", items, subActive)
  return (
    <HeaderSubMenuStyled
      isactive={subActive}
      onMouseEnter={handleIsActiveOn}
      onMouseLeave={handleIsActiveOff}
    >
      {items.map(subItem => (
        <HeaderSubMenuItem key={subItem.id} item={subItem} />
      ))}
    </HeaderSubMenuStyled>
  )
}

const HeaderSubMenuStyled = styled.ul`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: calc(100%);
  right: -50%;
  left: -50%;
  width: 30rem;
  margin: auto;
  padding: 1rem;
  background-color: ${colors.colorSecondary};
  text-align: center;
  transition: all 0.3s ease-in;
  opacity: ${props => (props.isactive ? "1" : "0")};
  visibility: ${props => (props.isactive ? "visible" : "hidden")};
`

export default HeaderSubMenu
