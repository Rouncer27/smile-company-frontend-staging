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
    icon: file(relativePath: { eq: "testimonial-tooth-icon.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

const Tooth = () => {
  const data = useStaticQuery(getData)
  const imageData = data.icon.childImageSharp.fluid
  return (
    <IconWrap>
      <Img fluid={imageData} alt="Smile and Company Default User Icon" />
    </IconWrap>
  )
}

export default Tooth
