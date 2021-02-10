import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { BigWrapper, colors, Nav1Lavender, B2White } from "../styles/helpers"

const Footer = () => {
  return (
    <FooterStyled>
      <div className="footWrap">
        <div className="footSignUp footBlock">
          <h3>Sign Up Today!</h3>
          <ul>
            <li>
              <Link to="/">Dental Clinic Sign up</Link>
            </li>
            <li>
              <Link to="/">Dental Professional Sign up</Link>
            </li>
          </ul>
        </div>

        <div className="footHello footBlock">
          <h3>Say Hello</h3>
          <p>
            Contact us{" "}
            <a href="mailto:info@smile-and-co.com">info@smile-and-co.com</a>
          </p>
        </div>

        <div className="footPermeanant footBlock">
          <h3>Permeanant Placement</h3>
          <ul>
            <li>
              <Link to="/">Job Board</Link>
            </li>
            <li>
              <Link to="/">Place a job on our job board</Link>
            </li>
          </ul>
        </div>

        <div className="footSocial footBlock">
          <h3>Connect and Share</h3>
          <ul>
            <li>
              <Link to="/">Instagram</Link>
            </li>
            <li>
              <Link to="/">Twitter</Link>
            </li>
            <li>
              <Link to="/">Facebook</Link>
            </li>
          </ul>
        </div>
      </div>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  width: 100%;
  background-color: ${colors.colorAlt};

  .footWrap {
    ${BigWrapper};
    align-items: flex-start;
  }

  .footBlock {
    width: 100%;
    align-self: flex-start;

    @media (min-width: 768px) {
      width: calc(20% - 2rem);
      margin: 0 1rem;
    }

    h3 {
      ${Nav1Lavender};
    }

    p,
    a {
      ${B2White};
    }

    a:hover {
      color: ${colors.colorTertiary};
    }
  }

  .footSocial {
    width: 100%;

    @media (min-width: 768px) {
      width: calc(20% - 2rem);
      margin-left: 20%;
    }
  }
`

export default Footer
