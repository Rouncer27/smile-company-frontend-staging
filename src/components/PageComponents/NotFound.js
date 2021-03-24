import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import {
  B1CharcoalGrey,
  Btn1DarkPurple,
  H1DarkPurple,
  standardWrapper,
} from "../../styles/helpers"

const NotFound = () => {
  return (
    <NotFoundStyled>
      <div className="wrapper">
        <div className="title">
          <h1>404 - Not Found</h1>
        </div>
        <div className="content">
          <p>You just hit a route that doesn&#39;t exist.</p>
          <Link to="/">Home</Link>
        </div>
      </div>
    </NotFoundStyled>
  )
}

const NotFoundStyled = styled.section`
  margin: 15rem auto;

  .wrapper {
    ${standardWrapper};
  }

  .title {
    width: 100%;
    text-align: center;

    h1 {
      ${H1DarkPurple};
    }
  }

  .content {
    width: 100%;
    text-align: center;

    p {
      ${B1CharcoalGrey};
    }

    a {
      ${Btn1DarkPurple};
    }
  }
`

export default NotFound
