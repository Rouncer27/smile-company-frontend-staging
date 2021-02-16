import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
  Btn1LightSage,
  colors,
  H1DarkPurple,
  H1CharcoalGrey,
  H4CharcoalGrey,
  standardWrapper,
} from "../../styles/helpers"

import PriceCard from "./PriceCard"

const Pricing = ({ data }) => {
  return (
    <PricingStyled id="clinicPricing">
      <div className="wrapper">
        <div className="mainTitle">
          <h2>Pricing Options</h2>
        </div>
        {data.pricingDetails.map((item, index) => (
          <PriceCard key={index} item={item} />
        ))}
        <div className="bottomContent">
          <h3>{data.bottomTitle}</h3>
          <p>{data.bottomContent}</p>
          <Link to={`/${data.buttonSlug}`}>{data.buttonText}</Link>
        </div>
      </div>
      <div className="backgroundEffect">
        <div className="backgroundEffect__inner" />
      </div>
    </PricingStyled>
  )
}

const PricingStyled = styled.section`
  position: relative;
  background-color: rgba(208, 204, 202, 0.25);

  .wrapper {
    ${standardWrapper};
    position: relative;
    max-width: 100rem !important;
    z-index: 10;
  }

  .backgroundEffect {
    position: absolute;
    top: 30%;
    right: 0;
    bottom: 0;
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

  .mainTitle {
    width: 100%;
    padding-bottom: 5rem;
    text-align: center;

    h2 {
      ${H1DarkPurple};
    }
  }

  .bottomContent {
    width: 100%;
    margin: 5rem auto;
    padding-bottom: 5rem;
    text-align: center;

    h3 {
      ${H1CharcoalGrey};
    }

    p {
      ${H4CharcoalGrey};
    }
    a {
      ${Btn1LightSage};
    }
  }
`

export default Pricing
