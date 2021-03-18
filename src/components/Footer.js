import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Link } from "gatsby"
import {
  BigWrapper,
  colors,
  Nav1Lavender,
  B2White,
  standardWrapper,
  Nav1White,
} from "../styles/helpers"

import SocialMediaContainer from "./SocialMedia/SocialMediaContainer"

const getData = graphql`
  {
    footerData: wp {
      siteWideSettings {
        acfSiteWideSettings {
          socialMediaLinks {
            type
            url
          }
          contactEmailAddress
          contactPhoneNumber
        }
      }
    }

    footerMenu: wpMenu(name: { eq: "Footer Menu" }) {
      name
      menuItems {
        nodes {
          label
          url
          id
        }
      }
    }
  }
`

const Footer = () => {
  const data = useStaticQuery(getData)
  const {
    socialMediaLinks,
    contactEmailAddress,
  } = data.footerData.siteWideSettings.acfSiteWideSettings
  const footerMenu = data.footerMenu.menuItems.nodes

  return (
    <FooterStyled>
      <div className="footWrap">
        <div className="footSignUp footBlock">
          <h3>Sign Up Today!</h3>
          <ul>
            <li>
              <Link to="/dental-clinic-signup">Dental Clinic Sign up</Link>
            </li>
            <li>
              <Link to="/dental-professionals-signup">
                Dental Professional Sign up
              </Link>
            </li>
          </ul>
        </div>

        <div className="footHello footBlock">
          <h3>Say Hello</h3>
          <p>
            Contact us{" "}
            <a href={`mailto:${contactEmailAddress}`}>{contactEmailAddress}</a>
          </p>
        </div>

        <div className="footPermeanant footBlock">
          <h3>Permeanant Placement</h3>
          <ul>
            {footerMenu.map(item => {
              const slug = item.url
                .split("/")
                .filter(item => item !== "")
                .join("/")
              return (
                <li key={item.id}>
                  <Link to={`/${slug}`}>{item.label}</Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="footSocial footBlock">
          <SocialMediaContainer socialMediaLinks={socialMediaLinks} />
        </div>
      </div>
      <div className="footCredWrap">
        <div className="policyLinks">
          <p>
            <Link to="/privacy-policy">Privacy Policy</Link> {" | "}
            <Link to="/disclaimer">Disclaimer</Link>
          </p>
        </div>
        <div className="swbCopy">
          <p>
            Smile and Company © 2021 All Rights Reserved Designed, and developed
            by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://switchbackcreative.ca/"
            >
              Switchback Creative
            </a>
            . Built with ♡ and{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.gatsbyjs.com/"
            >
              Gatsby
            </a>
          </p>
        </div>
      </div>
    </FooterStyled>
  )
}

const FooterStyled = styled.footer`
  width: 100%;
  background-color: ${colors.colorAlt};

  .footCredWrap {
    ${standardWrapper};

    .policyLinks {
      p {
        margin-bottom: 1rem;
      }

      a,
      p {
        ${B2White};
      }
    }

    .swbCopy {
      width: 100%;
      text-align: center;

      p,
      a {
        ${Nav1White};
        font-weight: 300;

        &:hover {
          color: ${colors.white};
          cursor: inherit;
        }
      }

      a:hover {
        color: ${colors.colorTertiary};
        cursor: pointer;
      }
    }
  }

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

    a[aria-current="page"] {
      color: ${colors.colorTertiary};

      &:hover {
        color: ${colors.colorTertiary};
        cursor: default;
      }
    }
  }

  .footSignUp {
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }

  .footHello {
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }

  .footPermeanant {
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }

  .footSocial {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;

    @media (min-width: 768px) {
      width: calc(20% - 2rem);
      margin-left: 20%;
      text-align: center;
    }
  }
`

export default Footer
