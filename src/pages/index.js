import React from "react"
import { graphql } from "gatsby"

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

          ... on WpPage_Acfmaintemplatefields_PageComponents_ThreeBlocks {
            fieldGroupName
            leftBlockContent
            leftBlockTitle
            leftBlockIcon {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 250) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            leftBlockBackgroundImage {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            rightBottomButtonSlug
            rightBottomButtonText
            rightBottomContent
            rightBottomTitle
            rightTopBackgroundImage {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            rightBottomBackgroundImage {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            rightTopButtonSlug
            rightTopButtonText
            rightTopContent
            rightTopTitle
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_ThreeSteps {
            bannerRequired
            bannerButtonSlug
            bannerButtonText
            bannerContent
            fieldGroupName
            mainContent
            mainTitle
            mainBackgroundColour
            stepsBackgroundColour
            buttonsRequired
            buttons {
              buttonSlug
              buttonText
              buttonType
            }
            steps {
              content
              fieldGroupName
              title
              secondTitle
              graphic {
                altText
                localFile {
                  childImageSharp {
                    fixed {
                      ...GatsbyImageSharpFixed_withWebp
                      width
                      height
                    }
                  }
                }
              }
            }
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_ImageBlocks {
            fieldGroupName

            imageOne {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }

            imageTwo {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_TestimonialsSlider {
            fieldGroupName
            showTestimonialsSlider
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_SideBySideContentBlocks {
            fieldGroupName
            contentBlock {
              title
              fieldGroupName
              content
              buttonText
              buttonSlug
              buttonRequired
              backgroundColour
            }
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_PricingOptions {
            fieldGroupName
            pricingDetails {
              content
              items {
                item
              }
              linkSlug
              price
              pricingDetails
              title
            }
            buttonText
            buttonSlug
            bottomTitle
            bottomContent
          }
        }
      }
    }
  }
`

export default IndexPage
