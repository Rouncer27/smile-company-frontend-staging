import React from "react"
import styled from "styled-components"
import {
  B1CharcoalGrey,
  H4Lavender,
  standardWrapper,
} from "../../styles/helpers"

const SideBySideContent = ({ data }) => {
  return (
    <SideBySideContentStyled>
      <div className="wrapper">
        <div
          className="contentLeft"
          dangerouslySetInnerHTML={{ __html: data.rightSideContent }}
        />
        <div
          className="contentRight"
          dangerouslySetInnerHTML={{ __html: data.leftSideContent }}
        />
      </div>
    </SideBySideContentStyled>
  )
}

const SideBySideContentStyled = styled.div`
  margin: 2rem auto;

  .wrapper {
    ${standardWrapper};
  }

  .contentLeft {
    width: 100%;

    @media (min-width: 768px) {
      width: calc(50% - 5rem);
      margin-right: 5rem;
    }

    p {
      ${H4Lavender};
    }
  }

  .contentRight {
    width: 100%;

    @media (min-width: 768px) {
      width: calc(50% - 5rem);
      margin-left: 5rem;
    }

    p {
      ${B1CharcoalGrey};
    }
  }
`

export default SideBySideContent
