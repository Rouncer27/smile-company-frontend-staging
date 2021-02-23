import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const IconWrap = styled.div`
  width: 100%;
  height: 100%;
`

const getData = graphql`
  {
    icon: file(relativePath: { eq: "app-icons/app-icon-mm.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

const Man = () => {
  const data = useStaticQuery(getData)
  const imageData = data.icon.childImageSharp.fluid
  return (
    <IconWrap>
      <Img fluid={imageData} alt="Smile and Company Icon" />
    </IconWrap>
  )
}

export default Man
