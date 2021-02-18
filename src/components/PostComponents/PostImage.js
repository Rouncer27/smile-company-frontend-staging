import React from "react"
import styled from "styled-components"
import Img from "gatsby-image"

const PostImage = ({ image }) => {
  return (
    <PostImageStyled>
      <Img fluid={image} />
    </PostImageStyled>
  )
}

const PostImageStyled = styled.div`
  width: 100%;
  padding-top: 2.5rem;
`

export default PostImage
