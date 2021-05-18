import React from "react"
import styled from "styled-components"
import {
  H1DarkPurple,
  H4Lavender,
  B1CharcoalGrey,
  standardWrapper,
  Btn1DarkPurple,
} from "../../styles/helpers"

const IntroSection = ({ data }) => {
  const linkBtnReq = data.buttonRequired

  return (
    <IntroSectionStyled>
      <div className="wrapper">
        <div className="upperTitle">
          <h2 dangerouslySetInnerHTML={{ __html: data.mainTitle }} />
        </div>
        <div className="secondaryTitle">
          <h2 dangerouslySetInnerHTML={{ __html: data.secondaryTitle }} />
        </div>
        {data.content && (
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        )}
        {linkBtnReq && (
          <div className="introBtn">
            <a href={data.buttonLinkSlug}>{data.buttonText}</a>
          </div>
        )}
      </div>
    </IntroSectionStyled>
  )
}

const IntroSectionStyled = styled.section`
  .wrapper {
    ${standardWrapper};

    @media (min-width: 768px) {
      max-width: 75rem;
    }
  }

  .upperTitle {
    width: 100%;
    text-align: center;
    h2 {
      ${H1DarkPurple};
    }
  }
  .secondaryTitle {
    width: 100%;
    text-align: center;
    h2 {
      ${H4Lavender};
    }
  }
  .content {
    width: 100%;
    text-align: center;
    p {
      ${B1CharcoalGrey};
    }
  }

  .introBtn {
    a {
      ${Btn1DarkPurple};
    }
  }
`

export default IntroSection
