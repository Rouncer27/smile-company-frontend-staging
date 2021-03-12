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

    @media (max-width: 768px) {
      max-width: 50rem;
      padding: 0;
    }
  }

  .mainTitle {
    width: 100%;
    padding: 0 3rem;

    @media (min-width: 768px) {
      padding: 0;
    }

    h2 {
      ${H2Lavender};
    }
  }

  .faqsContainer {
    width: 100%;
  }
`

export default FAQs
