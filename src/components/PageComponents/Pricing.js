import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
  B1CharcoalGrey,
  B2CharcoalGrey,
  Btn1LightSage,
  colors,
  H1DarkPurple,
  H1CharcoalGrey,
  H3CharcoalGrey,
  H4CharcoalGrey,
  H4DarkPurple,
  standardWrapper,
} from "../../styles/helpers"

const Pricing = ({ data }) => {
  return (
    <PricingStyled id="clinicPricing">
      <div className="wrapper">
        <div className="mainTitle">
          <h2>Pricing Options</h2>
        </div>
        {data.pricingDetails.map((item, index) => {
          return (
            <PriceCard key={index}>
              <div className="cardWrap">
                <div className="priceDetails">
                  <h2>{item.title}</h2>
                  <p className="priceDetails__number">{item.price}</p>
                  <p className="priceDetails__text">{item.pricingDetails}</p>
                </div>
                <div className="priceContent">
                  <p>{item.content}</p>
                </div>
                <div className="priceList">
                  <ul>
                    {item.items.map((singleItem, index) => (
                      <li key={index}>{singleItem.item}</li>
                    ))}
                  </ul>
                </div>
                <div className="priceLink">
                  <Link to={`/${item.linkSlug}`}>Let's Do It</Link>
                </div>
              </div>
            </PriceCard>
          )
        })}
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

const PriceCard = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 0;
  background-color: rgba(255, 255, 255, 1);

  @media (min-width: 768px) {
    width: calc(33.33% - 2rem);
    margin: 0 1rem;
  }

  .cardWrap {
    padding: 6rem 4.5rem;
    text-align: center;
  }

  .priceDetails {
    margin-bottom: 5.8rem;
    h2 {
      ${H4DarkPurple};
    }

    &__number {
      ${H3CharcoalGrey};
      margin: 0;
    }

    &__text {
      ${B2CharcoalGrey};
    }
  }

  .priceContent {
    margin-bottom: 3.5rem;

    p {
      ${B1CharcoalGrey};
    }
  }

  .priceList {
    margin-bottom: 4.9rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-top: solid 0.1rem ${colors.colorPrimary};
    border-bottom: solid 0.1rem ${colors.colorPrimary};
    ul {
      li {
        ${B1CharcoalGrey};
        font-weight: bold;
      }
    }
  }

  .priceLink {
    position: absolute;
    right: 0;
    bottom: 4rem;
    left: 0;
    width: 100%;

    a {
      ${Btn1LightSage};
    }
  }
`

export default Pricing