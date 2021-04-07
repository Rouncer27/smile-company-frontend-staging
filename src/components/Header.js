import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import MainLogo from "./Logo/MainLogo"
import HeaderNav from "./Navigation/HeaderNav"
import MobileNav from "./Navigation/MobileNav/MobileNav"
import { colors, BigWrapper } from "../styles/helpers"

const Header = ({ isapp }) => {
  return (
    <HeaderStyled>
      <div className="headWrap">
        <div className="headLogoWrap">
          <Link to="/">
            <MainLogo />
          </Link>
        </div>
        <HeaderNav />
        <MobileNav isapp={isapp} />
      </div>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  width: 100%;
  background: ${colors.colorPrimary};

  .headWrap {
    ${BigWrapper};
    align-items: center;
  }

  .headLogoWrap {
    width: 100%;

    @media (min-width: 768px) {
      width: calc(20%);
      margin: 0 auto;
    }

    @media (min-width: 1200px) {
      width: calc(20%);
      margin: 0;
    }

    .gatsby-image-wrapper {
      max-width: 25rem;
      margin: 0 auto;

      @media (min-width: 768px) {
        max-width: 100%;
      }
    }
  }
`

export default Header
