import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
  H1DarkPurple,
  standardWrapper,
  H4Lavender,
  colors,
  H4White,
  Btn1LightSage,
  Btn1DarkPurple,
} from "../../styles/helpers"

import StepCard from "./StepCard"

const ThreeSteps = ({ data }) => {
  return (
    <ThreeStepsSection bgcolor={data.mainBackgroundColour}>
      <div className="wrapper">
        <div className="introContent">
          <div className="introContent__title">
            <h2>{data.mainTitle}</h2>
          </div>
          <div
            className="introContent__paragraph"
            dangerouslySetInnerHTML={{ __html: data.mainContent }}
          />
          {data.buttonsRequired && (
            <div className="introContent__links">
              {data.buttons.map((btn, index) => (
                <Link
                  key={index}
                  className={`linkBtn button--${btn.buttonType}`}
                  to={btn.buttonSlug}
                >
                  {btn.buttonText}
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="steps">
          {data.steps &&
            data.steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                stepsbgcolor={data.stepsBackgroundColour}
              />
            ))}
        </div>
      </div>
      {data.bannerRequired && (
        <div className="banner">
          <p>
            {data.bannerContent}{" "}
            <Link to={data.bannerButtonSlug}>{data.bannerButtonText}</Link>
          </p>
        </div>
      )}
    </ThreeStepsSection>
  )
}

const ThreeStepsSection = styled.section`
  background-color: ${props =>
    props.bgcolor === "grey" ? "rgba(208,204,202, 0.25)" : colors.white};

  .wrapper {
    ${standardWrapper};
  }

  .introContent {
    width: 100%;
    max-width: 75rem;
    margin: auto;
    padding: 5rem 0 3rem;
    text-align: center;

    &__title {
      h2 {
        ${H1DarkPurple};
      }
    }

    &__paragraph {
      p {
        ${H4Lavender};
      }
    }

    &__links {
      a:last-of-type {
        margin-left: 2rem;
      }

      a.button--purple {
        ${Btn1DarkPurple};
      }

      a.button--sage {
        ${Btn1LightSage};
      }
    }
  }

  .steps {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
    justify-content: space-evenly;
    width: 100%;
    margin: 2rem auto;

    @media (min-width: 768px) {
      flex-wrap: nowrap;
    }
  }

  .banner {
    width: 100%;
    padding: 4rem;
    background: linear-gradient(
      to left top,
      ${colors.colorPrimary} 0%,
      ${colors.colorPrimary} 50%,
      ${colors.colorSecondary} 50%,
      ${colors.colorSecondary} 100%
    );
    text-align: center;

    p {
      ${H4White};
      margin: 0;

      a {
        ${Btn1LightSage};
        display: inline-block;
        margin-left: 2rem;
      }
    }
  }
`

export default ThreeSteps
