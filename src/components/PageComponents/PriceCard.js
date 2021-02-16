import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
  B1CharcoalGrey,
  B2CharcoalGrey,
  Btn1LightSage,
  colors,
  H3CharcoalGrey,
  H4DarkPurple,
} from "../../styles/helpers"

const PriceCard = ({ item }) => {
  return (
    <PriceCardStyled>
      <div className="cardWrap">
        <div className="priceDetails">
          <h2>{item.title}</h2>
          <p className="priceDetails__number">{item.price}</p>
          <p className="priceDetails__text">{item.pricingDetails}</p>
        </div>
        <div
          className="priceContent"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
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
    </PriceCardStyled>
  )
}

const PriceCardStyled = styled.div`
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

export default PriceCard
