import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import {
  Btn1LightSage,
  colors,
  H1CharcoalGrey,
  B1CharcoalGrey,
  medWrapper,
  H2White,
  B2White,
} from "../../styles/helpers"
import PriceCard from "./PriceCard"

const PricingReversed = ({ data }) => {
  return (
    <PricingReversedSection>
      <div className="wrapper">
        <div className="introBox">
          <h2>{data.boxTitle}</h2>
          <p>{data.boxContent}</p>
          <Link to={`/${data.boxButtonSlug}`}>{data.boxButtonText}</Link>
        </div>
        <div className="mainIntro">
          <h2>{data.mainTitle}</h2>
          <div dangerouslySetInnerHTML={{ __html: data.mainContent }} />
        </div>
        <div className="cardsWrapper">
          {data.pricingDetails.map((item, index) => (
            <PriceCard key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="backgroundEffect">
        <div className="backgroundEffect__inner" />
      </div>
    </PricingReversedSection>
  )
}

const PricingReversedSection = styled.section`
  position: relative;
  margin-top: 10rem;
  padding-bottom: 5rem;
  background-color: rgba(208, 204, 202, 0.25);

  .wrapper {
    ${medWrapper};
    position: relative;
    z-index: 10;
  }

  .cardsWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100rem !important;
    margin: 0 auto;
  }

  .introBox {
    position: relative;
    width: 100%;
    padding: 4rem;
    transform: translateY(-5rem);
    background-color: ${colors.colorTertiary};

    @media (min-width: 768px) {
      width: calc(33.33% - 5rem);
      margin-right: 5rem;
      transform: translateY(-10rem);
    }

    h2 {
      ${H2White};
    }

    p {
      ${B2White};
    }

    a {
      ${Btn1LightSage};
    }
  }

  .mainIntro {
    width: 100%;

    @media (min-width: 768px) {
      width: calc(66.66% - 5rem);
      margin-left: 5rem;
    }

    h2 {
      ${H1CharcoalGrey};
    }

    p {
      ${B1CharcoalGrey};
    }
  }

  .backgroundEffect {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 30%;
    left: 0;
    background: ${colors.white};
    z-index: 1;

    &__inner {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        to left top,
        rgba(173, 137, 166, 0.4) 0%,
        rgba(173, 137, 166, 0.4) 50%,
        rgba(173, 137, 166, 0.7) 50%,
        rgba(173, 137, 166, 0.7) 100%
      );
      z-index: 10;
    }
  }
`

export default PricingReversed
