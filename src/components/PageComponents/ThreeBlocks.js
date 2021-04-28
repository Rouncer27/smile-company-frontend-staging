import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import BgImage from "gatsby-background-image"
import {
  Btn1DarkPurple,
  H3CharcoalGrey,
  B1CharcoalGrey,
  H1White,
  H4White,
  colors,
} from "../../styles/helpers"

const ThreeBlocks = ({ data }) => {
  return (
    <ThreeBlocksSection>
      <div className="wrapper">
        <div className="block blockLeft">
          <div className="blockLeft__content">
            <div>
              <h2>{data.leftBlockTitle}</h2>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.leftBlockContent }} />
            <div className="blockLeft__content--icon">
              <Img
                fluid={data.leftBlockIcon.localFile.childImageSharp.fluid}
                alt="Let us help! Fist bump!"
              />
            </div>
          </div>
          <div className="blockLeft__overlay" />
          <div className="blockLeft__backgroundImage">
            <BgImage
              tag="div"
              fluid={
                data.leftBlockBackgroundImage.localFile.childImageSharp.fluid
              }
            />
          </div>
        </div>
        <div className="block blockRight">
          <div className="blockRight__top">
            <div className="blockRight__top--content">
              <div className="blockRight__title">
                <h3>{data.rightTopTitle}</h3>
              </div>
              <div
                className="blockRight__content"
                dangerouslySetInnerHTML={{ __html: data.rightTopContent }}
              />
              <div className="blockRight__button">
                <Link to={data.rightTopButtonSlug}>
                  {data.rightTopButtonText}
                </Link>
              </div>
            </div>
            <div className="blockRight__top--overlay" />
            <div className="blockRight__top--backgroundImage">
              <BgImage
                tag="div"
                fluid={
                  data.rightTopBackgroundImage.localFile.childImageSharp.fluid
                }
              />
            </div>
          </div>
          <div className="blockRight__bottom">
            <div className="blockRight__bottom--content">
              <div className="blockRight__title">
                <h3>{data.rightBottomTitle}</h3>
              </div>
              <div
                className="blockRight__content"
                dangerouslySetInnerHTML={{ __html: data.rightBottomContent }}
              />
              <div className="blockRight__button">
                <Link to={data.rightBottomButtonSlug}>
                  {data.rightBottomButtonText}
                </Link>
              </div>
            </div>
            <div className="blockRight__bottom--overlay" />
            <div className="blockRight__bottom--backgroundImage">
              <BgImage
                tag="div"
                fluid={
                  data.rightBottomBackgroundImage.localFile.childImageSharp
                    .fluid
                }
              />
            </div>
          </div>
        </div>
      </div>
    </ThreeBlocksSection>
  )
}

const ThreeBlocksSection = styled.section`
  .wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .block {
    width: 100%;

    @media (min-width: 768px) {
      width: calc(50% - 1rem);
    }
  }

  .blockLeft {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 0;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      margin-right: 1rem;
      margin-top: 0;
      margin-bottom: 0;
    }

    &__content {
      position: relative;
      padding: 7.5rem;
      z-index: 10;

      h2 {
        ${H4White};
      }

      p {
        ${H1White};
      }

      &--icon {
        width: 6rem;
      }
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${colors.colorPrimary};
      opacity: 0.75;
      z-index: 5;
    }

    &__backgroundImage {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;

      div {
        width: 100%;
        height: 100%;
      }
    }
  }

  .blockRight {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 0;

    @media (min-width: 768px) {
      margin-left: 1rem;
    }

    &__top {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      height: calc(50% - 1rem);
      margin-bottom: 1rem;

      &--content {
        position: relative;
        padding: 7.5rem;
        z-index: 10;
      }

      &--overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${colors.colorShad};
        opacity: 0.75;
        z-index: 5;
      }

      &--backgroundImage {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        div {
          width: 100%;
          height: 100%;
        }
      }
    }

    &__bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      height: calc(50% - 1rem);
      margin-top: 1rem;

      &--content {
        position: relative;
        padding: 7.5rem;
        z-index: 10;
      }

      &--overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${colors.colorSecondary};
        opacity: 0.75;
        z-index: 5;
      }

      &--backgroundImage {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        div {
          width: 100%;
          height: 100%;
        }
      }
    }

    &__title {
      width: 100%;

      h3 {
        ${H3CharcoalGrey};
      }
    }

    &__content {
      p {
        ${B1CharcoalGrey};
      }
    }

    &__button {
      a {
        ${Btn1DarkPurple};
      }
    }
  }
`

export default ThreeBlocks
