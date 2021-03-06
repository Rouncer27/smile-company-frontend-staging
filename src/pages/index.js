import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import ComponentGroups from "../components/PageComponentGroups"

const IndexPage = props => {
  const { components, seo } = props.data
  return (
    <Layout>
      <SEO
        title={seo.pageSeoData.swbThemeMetaTitle}
        description={seo.pageSeoData.swbThemeDescription}
        metaImg={seo.pageSeoData.swbThemeImage.localFile.relativePath}
        location={props.location.pathname}
      />
      <ComponentGroups components={components} />
    </Layout>
  )
}

export const homeQuery = graphql`
  {
    seo: wpPage(slug: { eq: "home" }) {
      pageSeoData {
        swbThemeDescription
        swbThemeMetaTitle
        swbThemeImage {
          localFile {
            relativePath
          }
        }
      }
    }

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

          ... on WpPage_Acfmaintemplatefields_PageComponents_PricingOptionsReversed {
            boxButtonSlug
            boxButtonText
            boxContent
            boxTitle
            fieldGroupName
            mainContent
            mainTitle
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
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_SideBySideContent {
            fieldGroupName
            leftSideContent
            rightSideContent
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_TeamCardsSection {
            fieldGroupName
            mainTitle
            subTitle
            teamCards {
              bio
              fieldGroupName
              name
              position
              image {
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

          ... on WpPage_Acfmaintemplatefields_PageComponents_OurValuesSection {
            content
            fieldGroupName
            title
            points {
              point
            }
            backgroundImage {
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

          ... on WpPage_Acfmaintemplatefields_PageComponents_Affiliates {
            content
            fieldGroupName
            mainTitle
            affiliates {
              affiliateBio
              affiliateUrl
              logo {
                altText
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 500) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_FaqsSection {
            fieldGroupName
            sectionTitle
            faqs {
              answer
              question
            }
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_ContactForm {
            fieldGroupName
            formMainTitle
            formId
            formFields {
              id
              label
              placeholder
              required
              size
              type
              options {
                label
                id
                required
              }
            }
            sidebarButtonSlug
            sidebarButtonText
            sidebarContent
            sidebarDispaly
            sidebarTitle
            mustReadTerms
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_ContactFormWithPayment {
            fieldGroupName
            formMainTitle
            formId
            formFields {
              id
              label
              placeholder
              required
              size
              type
              options {
                label
                id
                required
              }
            }
            sidebarButtonSlug
            sidebarButtonText
            sidebarContent
            sidebarDispaly
            sidebarTitle
            mustReadTerms
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_ContactBanner {
            email
            fieldGroupName
            phone
            socialShare
            title
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_NewsAndUpdates {
            displayNewsAndUpdates
            fieldGroupName
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_JobPostings {
            displayJobPostings
            fieldGroupName
            sidebarButtonSlug
            sidebarButtonText
            sidebarContent
            sidebarTitle
          }

          ... on WpPage_Acfmaintemplatefields_PageComponents_SimpleWysiwyg {
            fieldGroupName
            wysiwygContent
          }
        }
      }
    }
  }
`

export default IndexPage
