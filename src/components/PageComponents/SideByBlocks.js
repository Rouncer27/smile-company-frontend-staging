import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import {
  colors,
  H3CharcoalGrey,
  B1CharcoalGrey,
  Btn1DarkPurple,
} from "../../styles/helpers"

const SideByBlocks = ({ data }) => {
  console.log({ data })

  const { contentBlock } = data
  return (
    <SideByBlocksSection>
      <div className="wrapper">
        {contentBlock.map((block, index) => {
          return (
            <BlockStyled key={index} bgcolor={block.backgroundColour}>
              <div className="blockTitle">
                <h2>{block.title}</h2>
              </div>
              <div
                className="blockContent"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
              {block.buttonRequired && (
                <div className="blockLink">
                  <Link to={`/${block.buttonSlug}`}>{block.buttonText}</Link>
                </div>
              )}
            </BlockStyled>
          )
        })}
      </div>
    </SideByBlocksSection>
  )
}

const SideByBlocksSection = styled.section`
  width: 100%;
  margin: 5rem auto 3rem;

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

const BlockStyled = styled.div`
  width: 100%;
  padding: 3rem 2rem;
  background: linear-gradient(
    to bottom,
    ${props =>
      props.bgcolor === "beige"
        ? `#aca7a4,${colors.colorShad}, #eee`
        : props =>
            props.bgcolor === "lavender"
              ? `${colors.colorSecondary}, #d2bece`
              : `${colors.colorPrimary}, #d2bece`}
  );

  @media (min-width: 768px) {
    width: calc(50% - 1rem);
    padding: 6rem 7.5rem;
  }
  .blockTitle {
    h2 {
      ${H3CharcoalGrey};
    }
  }

  .blockContent {
    p {
      ${B1CharcoalGrey};
    }
  }

  .blockLink {
    a {
      ${Btn1DarkPurple};
      background: transparent;
    }
  }
`

export default SideByBlocks
