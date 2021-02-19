import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { B2CharcoalGrey, H1DarkPurple, H4Lavender } from "../../styles/helpers"

const getData = graphql`
  {
    appPageContent: wp {
      appSettings {
        appPageContent {
          clinicSignUpContent
          clinicSignUpSubTitle
          clinicSignUpTitle
          dentalSignUpIntroContent
          dentalSignUpIntroSubTitle
          dentalSignUpIntroTitle
        }
      }
    }
  }
`

const AppSignUpIntro = ({ location }) => {
  const data = useStaticQuery(getData)
  let title
  let subTitle
  let content

  if (location === "clinic") {
    title = data.appPageContent.appSettings.appPageContent.clinicSignUpTitle
    subTitle =
      data.appPageContent.appSettings.appPageContent.clinicSignUpSubTitle
    content = data.appPageContent.appSettings.appPageContent.clinicSignUpContent
  } else if (location === "dental") {
    title =
      data.appPageContent.appSettings.appPageContent.dentalSignUpIntroTitle
    subTitle =
      data.appPageContent.appSettings.appPageContent.dentalSignUpIntroSubTitle
    content =
      data.appPageContent.appSettings.appPageContent.dentalSignUpIntroContent
  }

  return (
    <AppSignUpIntroStyled>
      <div>
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </AppSignUpIntroStyled>
  )
}

const AppSignUpIntroStyled = styled.div`
  width: 100%;
  max-width: 65rem;

  h2 {
    ${H1DarkPurple};
  }

  h3 {
    ${H4Lavender};
  }

  p {
    ${B2CharcoalGrey};
  }
`

export default AppSignUpIntro
