import React from "react"
import styled from "styled-components"

import SocialMediaIcon from "./SocialMediaIcon"

import { Nav1Lavender } from "../../styles/helpers"

const SocialMediaContainer = ({ socialMediaLinks }) => {
  return (
    <StyledContainer>
      <div className="socialTitle">
        <h3>Connect and Share</h3>
      </div>
      <ul>
        {socialMediaLinks.map(link => (
          <SocialMediaIcon key={link.type} icon={link} />
        ))}
      </ul>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;

  .socialTitle {
    width: 100%;
    margin-bottom: 1rem;

    h3 {
      ${Nav1Lavender};
    }
  }

  ul {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    @media (min-width: 768px) {
      justify-content: space-around;
      justify-content: space-evenly;
    }
  }
`

export default SocialMediaContainer
