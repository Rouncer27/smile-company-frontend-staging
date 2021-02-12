import React from "react"
import BGImage from "gatsby-background-image"
import styled from "styled-components"

const ImageBlocks = ({ data }) => {
  return (
    <ImageBlocksStyled>
      <div className="wrapper">
        <div className="imageBlock imageBlockOne">
          <BGImage
            tag="div"
            fluid={data.imageOne.localFile.childImageSharp.fluid}
          />
        </div>
        <div className="imageBlock imageBlockTwo">
          <BGImage
            tag="div"
            fluid={data.imageTwo.localFile.childImageSharp.fluid}
          />
        </div>
      </div>
    </ImageBlocksStyled>
  )
}

const ImageBlocksStyled = styled.div`
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    @media (min-width: 768px) {
      flex-wrap: nowrap;
    }
  }

  .imageBlock {
    width: 100%;
    height: 35rem;

    @media (min-width: 768px) {
      height: 45rem;
    }

    @media (min-width: 1025px) {
      height: 50rem;
    }

    div {
      width: 100%;
      height: 100%;
    }
  }

  .imageBlockOne {
    @media (min-width: 768px) {
      width: calc(40% - 1rem);
      margin-right: 1rem;
    }
  }

  .imageBlockTwo {
    @media (min-width: 768px) {
      width: calc(60% - 1rem);
      margin-left: 1rem;
    }
  }
`

export default ImageBlocks
