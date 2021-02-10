import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

const getData = graphql`
  {
    logo: wp {
      siteWideSettings {
        acfSiteWideSettings {
          sacMainLogo {
            altText
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`

const MainLogo = () => {
  const data = useStaticQuery(getData)
  console.log(data)
  const logoFluid =
    data.logo.siteWideSettings.acfSiteWideSettings.sacMainLogo.localFile
      .childImageSharp.fluid
  const logoAlt =
    data.logo.siteWideSettings.acfSiteWideSettings.sacMainLogo.altText
  return (
    <MainLogoStyled>
      <Img fluid={logoFluid} alt={logoAlt} />
    </MainLogoStyled>
  )
}

const MainLogoStyled = styled.div`
  width: 100%;
  height: 100%;
`

export default MainLogo
