import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import {
  B1CharcoalGrey,
  colors,
  H1DarkPurple,
  H4Lavender,
  medWrapper,
} from "../../styles/helpers"

const Affiliates = ({ data }) => {
  return (
    <AffiliatesSection>
      <div className="wrapper">
        <div className="introSection">
          <h2>{data.mainTitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
        <div>
          {data.affiliates.map((affiliate, index) => {
            return (
              <Affiliate key={index}>
                <div className="affiliateLogo">
                  <Img
                    fluid={affiliate.logo.localFile.childImageSharp.fluid}
                    alt={affiliate.logo.altText}
                  />
                </div>
                <div
                  className="affiliateBio"
                  dangerouslySetInnerHTML={{ __html: affiliate.affiliateBio }}
                />
              </Affiliate>
            )
          })}
        </div>
      </div>
    </AffiliatesSection>
  )
}

const AffiliatesSection = styled.section`
  .wrapper {
    ${medWrapper};
  }

  .introSection {
    width: 100%;
    margin-bottom: 5rem;
    text-align: center;

    h2 {
      ${H1DarkPurple};
    }

    p,
    a {
      ${H4Lavender};
    }

    a:hover {
      color: ${colors.colorAccent};
    }
  }
`

const Affiliate = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  .affiliateLogo {
    width: 100%;
    max-width: 20rem;
    margin: auto;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      width: calc(20%);
      margin: 0;
      padding: 0 2rem;
    }

    @media (min-width: 1026px) {
      width: calc(15%);
      padding: 0 2rem;
    }
  }

  .affiliateBio {
    width: 100%;
    text-align: center;

    @media (min-width: 768px) {
      width: calc(80% - 2rem);
      margin-left: 2rem;
      text-align: left;
    }

    @media (min-width: 1025px) {
      width: calc(85% - 2rem);
      margin-left: 2rem;
    }

    p {
      ${B1CharcoalGrey};
    }
  }
`

export default Affiliates
