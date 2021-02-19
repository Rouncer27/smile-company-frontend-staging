import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BGImage from "gatsby-background-image"
import styled from "styled-components"
import { B1White, colors } from "../../styles/helpers"

const getData = graphql`
  {
    sideBar: wp {
      appSettings {
        appSidebarContent {
          fieldGroupName
          loginColour
          loginContent
          loginBackgroundImage {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          loginIcon {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          clinicSignupContent
          clinicSignUpColour
          clinicSignUpBackgroundImage {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          clinicSignUpIcon {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }

          dentalSignUpContent
          dentalSignUpColour
          dentalSignUpBackgroundImage {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          dentalSignUpIcon {
            altText
            localFile {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`

const AppSidebar = ({ location }) => {
  const data = useStaticQuery(getData)
  console.log(data)
  const sideBarData = data.sideBar.appSettings.appSidebarContent

  console.log(location)

  let content
  let backgroundColour
  let backgroundImg

  if (location === "login") {
    content = sideBarData.loginContent
    backgroundColour = sideBarData.loginColour
    backgroundImg =
      sideBarData.loginBackgroundImage.localFile.childImageSharp.fluid
  } else if (location === "clinicSignup") {
    content = sideBarData.clinicSignupContent
    backgroundColour = sideBarData.clinicSignUpColour
    backgroundImg =
      sideBarData.clinicSignUpBackgroundImage.localFile.childImageSharp.fluid
  } else if (location === "dentalSignup") {
    content = sideBarData.dentalSignUpContent
    backgroundColour = sideBarData.dentalSignUpColour
    backgroundImg =
      sideBarData.dentalSignUpBackgroundImage.localFile.childImageSharp.fluid
  }

  return (
    <AppSidebarStyled bgcolor={backgroundColour}>
      {content && (
        <div className="sidebarContent">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
      {backgroundImg && (
        <div className="sidebarBackgroundImage">
          <BGImage tag="div" fluid={backgroundImg} />
        </div>
      )}
      <div className="sidebarOverlay" />
    </AppSidebarStyled>
  )
}

const AppSidebarStyled = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;

  .sidebarContent {
    position: relative;
    padding: 20rem 10rem 10rem;
    z-index: 10;

    p {
      ${B1White};
    }
  }

  .sidebarBackgroundImage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    div {
      width: 100%;
      height: 100%;
    }
  }

  .sidebarOverlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props =>
      props.bgcolor === "sage"
        ? colors.colorTertiary
        : props.bgcolor === "darkPurple"
        ? colors.colorPrimary
        : props.bgcolor === "lavender"
        ? colors.colorSecondary
        : props.bgcolor === "black"
        ? colors.black
        : colors.colorSecondary};
    opacity: 0.75;
    z-index: 5;
  }
`

export default AppSidebar
