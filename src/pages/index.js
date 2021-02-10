import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import ComponentGroups from "../components/PageComponentGroups"

const IndexPage = props => {
  const { components } = props.data
  return (
    <Layout>
      <SEO title="Smile and Copmany" />
      <ComponentGroups components={components} />
    </Layout>
  )
}

export const homeQuery = graphql`
  {
    components: wpPage(slug: { eq: "home" }) {
      acfMainTemplateFields {
        pageComponents {
          ... on WpPage_Acfmaintemplatefields_PageComponents_IntroSection {
            buttonLinkSlug
            buttonRequired
            buttonText
            content
            fieldGroupName
            mainTitle
            secondaryTitle
          }
        }
      }
    }
  }
`

export default IndexPage
