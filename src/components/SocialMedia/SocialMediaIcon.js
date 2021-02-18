import React from "react"
import styled from "styled-components"

import Facebook from "../Icons/Facebook"
import Instagram from "../Icons/Instagram"
import Linkedin from "../Icons/Linkedin"
import Twitter from "../Icons/Twitter"

import { colors } from "../../styles/helpers"

const SocialMedia = ({ icon }) => {
  let socialIcon
  if (icon.type === "instagram") {
    socialIcon = <Instagram />
  } else if (icon.type === "facebook") {
    socialIcon = <Facebook />
  } else if (icon.type === "linkedin") {
    socialIcon = <Linkedin />
  } else if (icon.type === "twitter") {
    socialIcon = <Twitter />
  }

  return (
    <StyledIcon>
      <a target="_blank" rel="noreferrer" href={icon.url}>
        {socialIcon}
      </a>
    </StyledIcon>
  )
}

const StyledIcon = styled.li`
  display: inline-block;
  margin-right: 1rem;
  margin-left: 1rem;

  &:first-of-type {
    margin-left: 0;
  }

  a {
    display: block;
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;

    @media (min-width: 768px) {
      width: 2rem;
      height: 2rem;
    }
    @media (min-width: 1025px) {
      width: 2rem;
      height: 2rem;
    }

    svg {
      display: block;
      width: 4rem;
      height: 4rem;
      margin: auto;
      transition: all 0.3s ease-out;
      fill: ${colors.colorSecondary};

      @media (min-width: 768px) {
        width: 2rem;
        height: 2rem;
      }
      @media (min-width: 1025px) {
        width: 2rem;
        height: 2rem;
      }

      &:hover {
        fill: ${colors.white};
      }
    }
  }
`

export default SocialMedia
