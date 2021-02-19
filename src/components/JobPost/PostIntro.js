import React from "react"
import styled from "styled-components"
import { H1DarkPurple, H4Lavender } from "../../styles/helpers"

const PostIntro = () => {
  return (
    <PostIntroStyled>
      <h2>Job Board</h2>
      <p>
        Check out our Job Board if you are looking for great permanent work.
      </p>
    </PostIntroStyled>
  )
}

const PostIntroStyled = styled.div`
  width: 100%;
  text-align: center;

  h2 {
    ${H1DarkPurple};
  }

  p {
    ${H4Lavender};
  }
`

export default PostIntro
