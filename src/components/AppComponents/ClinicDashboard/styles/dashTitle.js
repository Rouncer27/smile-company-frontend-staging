import { css } from "styled-components"
import { H1DarkPurple, B1Sage } from "../../../../styles/helpers"

export default css`
  width: 100%;

  h2 {
    ${H1DarkPurple};
    margin-top: 0;
  }

  p {
    ${B1Sage};
    margin-bottom: 0;
    font-weight: bold;
  }
`
