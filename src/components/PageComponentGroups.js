import React from "react"

import IntroSection from "./PageComponents/IntroSection"
import ThreeBlocks from "./PageComponents/ThreeBlocks"
import ThreeSteps from "./PageComponents/ThreeSteps"
import ImageBlocks from "./PageComponents/ImageBlocks"
import Testimonials from "./PageComponents/Testimonials"

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
