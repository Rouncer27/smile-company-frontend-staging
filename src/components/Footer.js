import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Link } from "gatsby"
import { BigWrapper, colors, Nav1Lavender, B2White } from "../styles/helpers"

import Facebook from "./Icons/Facebook"
import Instagram from "./Icons/Instagram"
import Linkedin from "./Icons/Linkedin"
import Twitter from "./Icons/Twitter"

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
          <div className="footSocial__title">
            <h3>Connect and Share</h3>
          </div>
          <ul>
            {socialMediaLinks.map(link => {
              let socialIcon
              if (link.type === "instagram") {
                socialIcon = <Instagram />
              } else if (link.type === "facebook") {
                socialIcon = <Facebook />
              } else if (link.type === "linkedin") {
                socialIcon = <Linkedin />
              } else if (link.type === "twitter") {
                socialIcon = <Twitter />
              }
              return (
                <li key={link.type}>
                  <a target="_blank" rel="noreferrer" href={link.url}>
                    {socialIcon}
                  </a>
                </li>
              )
            })}
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

    &__title {
      width: 100%;
      margin-bottom: 1rem;
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

    li {
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
    }
  }
`

export default Footer
