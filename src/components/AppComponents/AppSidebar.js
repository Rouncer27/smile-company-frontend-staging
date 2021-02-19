import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BGImage from "gatsby-background-image"
import styled from "styled-components"

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
        }
      }
    }
  }
`

const AppSidebar = ({ location }) => {
  const data = useStaticQuery(getData)
  console.log(data)
  const constsideBarData = data.sideBar.appSettings.appSidebarContent

  console.log(location)

  let content
  let backgroundColour
  let backgroundImg

  if (location === "login") {
    content = constsideBarData.loginContent
    backgroundColour = constsideBarData.loginColour
    backgroundImg =
      constsideBarData.loginBackgroundImage.localFile.childImageSharp.fluid
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
  position: relative;
  width: 100%;

  .sidebarBackgroundImage {
    position: absolute;
  }


`

export default AppSidebar
