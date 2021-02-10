import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const DefaultUserWrap = styled.div`
  width: 100%;
  height: 100%;
`

const getData = graphql`
  {
    defaultUser: file(relativePath: { eq: "default-user-icon.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

const DefaultUser = () => {
  const data = useStaticQuery(getData)
  const imageData = data.defaultUser.childImageSharp.fluid
  return (
    <DefaultUserWrap>
      <Img fluid={imageData} alt="Smile and Company Default User Icon" />
    </DefaultUserWrap>
  )
}

export default DefaultUser
