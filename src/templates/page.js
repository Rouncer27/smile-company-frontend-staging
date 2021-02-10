import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import ComponentGroups from "../components/PageComponentGroups"

const page = props => {
  const { components } = props.data
  return (
    <Layout location={props?.location?.pathname}>
      <SEO title="Page Template" />
      <ComponentGroups components={components} />
    </Layout>
  )
}

export const pageTempQuery = graphql`
  query pageTempPage($id: String!) {
    components: wpPage(id: { eq: $id }) {
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

export default page
