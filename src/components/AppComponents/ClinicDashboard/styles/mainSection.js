import { css } from "styled-components"
import { colors } from "../../../../styles/helpers"

export default css`
  align-self: stretch;
  background-color: ${colors.white};
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    width: calc(70vw);
  }
`
