import React from "react"

import IntroSection from "./PageComponents/IntroSection"
import ThreeBlocks from "./PageComponents/ThreeBlocks"
import ThreeSteps from "./PageComponents/ThreeSteps"
import ImageBlocks from "./PageComponents/ImageBlocks"
import Testimonials from "./PageComponents/Testimonials"
import SideByBlocks from "./PageComponents/SideByBlocks"
import Pricing from "./PageComponents/Pricing"
import PricingReversed from "./PageComponents/PricingReversed"
import SideBySideContent from "./PageComponents/SideBySideContent"
import TeamCards from "./PageComponents/TeamCards"
import OurValues from "./PageComponents/OurValues"
import Affiliates from "./PageComponents/Affiliates"
import FAQs from "./PageComponents/FAQs"
import ContactForm from "./PageComponents/ContactForm"
import ContactBanner from "./PageComponents/ContactBanner"

const ComponentGroups = props => {
  const { components } = props
  const allPageComponents =
    components?.acfMainTemplateFields?.pageComponents?.length > 0 ? (
      <>
        {components?.acfMainTemplateFields?.pageComponents.map(
          (component, index) => {
            switch (component?.fieldGroupName) {
              case "page_Acfmaintemplatefields_PageComponents_IntroSection":
                return <IntroSection key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_ThreeBlocks":
                return <ThreeBlocks key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_ThreeSteps":
                return <ThreeSteps key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_ImageBlocks":
                return <ImageBlocks key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_TestimonialsSlider":
                return <Testimonials key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_SideBySideContentBlocks":
                return <SideByBlocks key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_PricingOptions":
                return <Pricing key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_PricingOptionsReversed":
                return <PricingReversed key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_SideBySideContent":
                return <SideBySideContent key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_TeamCardsSection":
                return <TeamCards key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_OurValuesSection":
                return <OurValues key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_Affiliates":
                return <Affiliates key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_FaqsSection":
                return <FAQs key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_ContactForm":
                return <ContactForm key={index} data={component} />
              case "page_Acfmaintemplatefields_PageComponents_ContactBanner":
                return <ContactBanner key={index} data={component} />
              default:
                return (
                  <p>Cannot find this component {component.fieldGroupName}</p>
                )
            }
          }
        )}
      </>
    ) : (
      <p>This page has no content</p>
    )

  return <>{allPageComponents}</>
}

export default ComponentGroups
