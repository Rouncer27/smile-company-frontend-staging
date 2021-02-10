import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import MainLogo from "./Logo/MainLogo"
import HeaderNav from "./Navigation/HeaderNav"
import { colors, BigWrapper } from "../styles/helpers"

const Header = () => {
  return (
    <HeaderStyled>
      <div className="headWrap">
        <div className="headLogoWrap">
          <Link to="/">
            <MainLogo />
          </Link>
        </div>
        <HeaderNav />
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
    }
  }
`

export default Header
