import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import {
  B2CharcoalGrey,
  H1DarkPurple,
  H4Lavender,
} from "../../../styles/helpers"

const getData = graphql`
  {
    appPageContent: wp {
      appSettings {
        appPageContent {
          clinicSignUpContent
          clinicSignUpSubTitle
          clinicSignUpTitle
        }
      }
    }
  }
`

const ClinicSignUpIntro = () => {
  const data = useStaticQuery(getData)

  const title = data.appPageContent.appSettings.appPageContent.clinicSignUpTitle
  const subTitle =
    data.appPageContent.appSettings.appPageContent.clinicSignUpSubTitle
  const content =
    data.appPageContent.appSettings.appPageContent.clinicSignUpContent

  return (
    <ClinicSignUpIntroStyled>
      <div>
        <h2>{title}</h2>
        <h3>{subTitle}</h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </ClinicSignUpIntroStyled>
  )
}

const ClinicSignUpIntroStyled = styled.div`
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

export default ClinicSignUpIntro
