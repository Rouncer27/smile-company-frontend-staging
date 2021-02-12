import React from "react"
import styled from "styled-components"
import MobileSubMenuItem from "./MobileSubMenuItem"

const MobileSubMenu = ({ subActive, items }) => {
  return (
    <MobileSubMenuStyled subactive={subActive} sublenght={items.length}>
      {items.map(item => (
        <MobileSubMenuItem key={item.id} item={item} />
      ))}
    </MobileSubMenuStyled>
  )
}

const MobileSubMenuStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  height: ${props =>
    props.subactive ? `calc(6rem * ${props.sublenght})` : `0rem`};
  transition: all 0.3s ease-out;
  opacity: ${props => (props.subactive ? 1 : 0)};
  visibility: ${props => (props.subactive ? "visible" : "hidden")};
`

export default MobileSubMenu
