import React from "react"
import styled from "styled-components"

const MobileNavButton = ({ toggleDrawer, isOpen }) => (
  <MobileButton type="button" isOpen={isOpen} onClick={toggleDrawer}>
    Menu
  </MobileButton>
)

const MobileButton = styled.button`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0.25rem;
  left: 0.25rem;
  width: 5.5rem;
  height: 5.5rem;
  margin: 0 auto;
  padding: 0;
  background: ${props => props.theme.colorSecondary};
  border: 0.1rem solid ${props => props.theme.white};
  box-shadow: 0.25rem 0.25rem 0.5rem 0rem rgba(0, 0, 0, 0.5);
  color: ${props =>
    props.isOpen ? props.theme.colorSecondary : props.theme.white};
  text-align: center;
  z-index: 99999999;

  @media (min-width: 768px) {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }

  &::before,
  &::after {
    display: block;
    position: absolute;
    right: 0;
    left: 0;
    width: 80%;
    height: 0.2rem;
    margin: 0 auto;
    transform: rotate(0);
    transform-origin: center center;
    transition: all 0.2s ease;
    background-color: ${props => props.theme.white};
    content: "";
  }

  &:focus {
    outline: none;
  }

  &::before {
    top: ${props => (props.isOpen ? "50%" : "1rem")};
    transform: rotate(${props => (props.isOpen ? "135deg" : "0deg")});
  }

  &::after {
    bottom: ${props => (props.isOpen ? "50%" : "1rem")};
    transform: rotate(${props => (props.isOpen ? "-135deg" : "0deg")});
  }

  &:hover {
    cursor: pointer;
    &::before {
      top: ${props => (props.isOpen ? "50%" : "0.5rem")};
    }

    &::after {
      bottom: ${props => (props.isOpen ? "50%" : "0.5rem")};
    }
  }
`

export default MobileNavButton
