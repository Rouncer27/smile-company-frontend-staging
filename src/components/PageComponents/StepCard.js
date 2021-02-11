import React from "react"
import styled from "styled-components"
import BGImage from "gatsby-background-image"
import {
  B2CharcoalGrey,
  H4Lavender,
  colors,
  H4DarkPurple,
} from "../../styles/helpers"

const StepCard = ({ step }) => {
  const graphicWidth = step.graphic.localFile.childImageSharp.fixed.width
  const graphicHeight = step.graphic.localFile.childImageSharp.fixed.height

  console.log({ graphicWidth })
  console.log({ graphicHeight })

  return (
    <StepCardStyled graphicwidth={graphicWidth} graphicheight={graphicHeight}>
      <div className="graphic">
        <div className="graphic__icon">
          <BGImage
            tag="div"
            fixed={step.graphic.localFile.childImageSharp.fixed}
          />
        </div>
      </div>
      <div className="content">
        <div>
          <h3>{step.title}</h3>
        </div>
        <div dangerouslySetInnerHTML={{ __html: step.content }} />
      </div>
    </StepCardStyled>
  )
}

const StepCardStyled = styled.div`
  width: 100%;
  margin-bottom: 5rem;
  transition: all 0.3s ease-out;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }

  .graphic {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: calc((1rem * ${props => props.graphicwidth}) / 20);
    height: 25rem;
    margin: auto;

    &__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);

      div {
        width: calc((1rem * ${props => props.graphicwidth}) / 20) !important;
        height: calc((1rem * ${props => props.graphicheight}) / 20) !important;
      }
    }
  }

  .content {
    padding: 3rem;
    transition: all 0.3s ease-out;
    background-color: ${colors.white};

    @media (min-width: 768px) {
      height: 28rem;
    }

    h3 {
      ${H4DarkPurple};
    }

    p {
      ${B2CharcoalGrey};
    }
  }

  &:hover {
    box-shadow: 0.1rem 3px 0.9rem 0 rgba(0, 0, 0, 0.16);

    .content {
      box-shadow: inset 0rem 0.9rem 0rem 0 #ad89a6;
      background-color: rgba(140, 159, 138, 0.35);
    }
  }
`

export default StepCard
