import React from "react"
import styled from "styled-components"
import BGImage from "gatsby-background-image"
import {
  B1White,
  colors,
  H1White,
  H4White,
  standardWrapper,
} from "../../styles/helpers"

const OurValues = ({ data }) => {
  console.log(data)
  return (
    <OurValuesSection>
      <div className="wrapper">
        <div className="valueContent">
          <div className="valueContent__title">
            <h2>{data.title}</h2>
          </div>
          <div className="valueContent__content">
            <div
              className="valueContent__content--para"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <div className="valueContent__content--points">
              <ul>
                {data.points.map((item, index) => (
                  <li key={index}>
                    <span />
                    {item.point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="overlay" />
      <div className="backgroundImage">
        <BGImage
          tag="div"
          fluid={data.backgroundImage.localFile.childImageSharp.fluid}
        />
      </div>
    </OurValuesSection>
  )
}

const OurValuesSection = styled.section`
  position: relative;

  .wrapper {
    ${standardWrapper};
    position: relative;
    z-index: 10;
  }

  .valueContent {
    width: 100%;
    max-width: 70rem;
    margin: 2rem auto;
    padding: 12.5rem 0;

    &__title {
      width: 100%;
      margin-bottom: 3.5rem;

      h2 {
        ${H1White};
      }
    }

    &__content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 1.5rem;

      &--para {
        width: calc(50% - 2rem);
        margin-right: 2rem;

        p {
          ${H4White};
        }
      }

      &--points {
        width: calc(50% - 2rem);
        margin-left: 2rem;

        ul {
          li {
            ${H4White};
            position: relative;
            margin-bottom: 2.5rem;
            padding-left: 4rem;
            text-transform: uppercase;

            span {
              display: block;
              position: absolute;
              top: 50%;
              left: 0;
              width: 2.2rem;
              height: 2.2rem;
              background-color: ${colors.colorAccent};
              border-radius: 50%;
              transform: translate(0, -50%);
            }
          }
        }
      }
    }
  }

  .backgroundImage {
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

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.colorPrimary};
    opacity: 0.75;
    z-index: 5;
  }
`

export default OurValues
