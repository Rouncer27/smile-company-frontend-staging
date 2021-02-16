import React from "react"
import styled from "styled-components"
import { H2Lavender, medWrapper } from "../../styles/helpers"

import FAQ from "./FAQ"

const FAQs = ({ data }) => {
  return (
    <FAQsSection>
      <div className="wrapper">
        <div className="mainTitle">
          <h2>{data.sectionTitle}</h2>
        </div>
        <div className="faqsContainer">
          {data.faqs.map((faq, index) => (
            <FAQ key={index} faq={faq} />
          ))}
        </div>
      </div>
    </FAQsSection>
  )
}

const FAQsSection = styled.section`
  margin-bottom: 5rem;

  .wrapper {
    ${medWrapper};
  }

  .mainTitle {
    width: 100%;

    h2 {
      ${H2Lavender};
    }
  }

  .faqsContainer {
    width: 100%;
  }
`

export default FAQs
